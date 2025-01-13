const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Araç bakımlarını getir
router.get('/arac/:id', async (req, res) => {
    try {
        const [bakimlar] = await db.query(
            'SELECT * FROM bakimlar WHERE arac_id = ? ORDER BY bakim_tarihi DESC',
            [req.params.id]
        );
        res.json(bakimlar);
    } catch (error) {
        console.error('Bakım listesi hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

// Yeni bakım ekle
router.post('/', async (req, res) => {
    try {
        const { 
            arac_id, 
            bakim_turu,      // 'Yapılan' veya 'Planlanan'
            bakim_islem,     // Bakım türü (Periyodik, Motor vs.)
            bakim_tarihi, 
            bakim_ucret, 
            planlanan_km,
            aciklama 
        } = req.body;

        if (bakim_turu === 'Planlanan') {
            // Planlanan bakım için
            const [result] = await db.query(
                'INSERT INTO bakimlar (arac_id, bakim_turu, bakim_islem, planlanan_km, aciklama, durum, bildirim_durumu) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [arac_id, bakim_turu, bakim_islem, planlanan_km, aciklama, 'Beklemede', 'Beklemede']
            );

            res.status(201).json({
                id: result.insertId,
                message: 'Bakım planı başarıyla oluşturuldu'
            });
        } else {
            // Yapılan bakım için
            const [result] = await db.query(
                'INSERT INTO bakimlar (arac_id, bakim_turu, bakim_islem, bakim_tarihi, bakim_ucret, aciklama, durum) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [arac_id, bakim_turu, bakim_islem, bakim_tarihi, bakim_ucret, aciklama, 'Tamamlandı']
            );

            // Yapılan bakım için aracın durumunu güncelle
            await db.query('UPDATE araclar SET durum = "Bakımda" WHERE id = ?', [arac_id]);

            res.status(201).json({
                id: result.insertId,
                message: 'Bakım kaydı başarıyla oluşturuldu'
            });
        }
    } catch (error) {
        console.error('Bakım ekleme hatası:', error);
        res.status(500).json({ 
            error: 'Bakım eklenirken bir hata oluştu',
            details: error.message 
        });
    }
});

// Bakım güncelle
router.put('/:id', async (req, res) => {
    try {
        const { bakim_tarihi, bakim_turu, bakim_ucret, aciklama, durum } = req.body;

        const [result] = await db.query(
            'UPDATE bakimlar SET bakim_tarihi = ?, bakim_turu = ?, bakim_ucret = ?, aciklama = ?, durum = ? WHERE id = ?',
            [bakim_tarihi, bakim_turu, bakim_ucret, aciklama, durum, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Bakım kaydı bulunamadı' });
        }

        // Bakım tamamlandıysa aracın durumunu güncelle
        if (durum === 'Tamamlandı') {
            const [bakim] = await db.query('SELECT arac_id FROM bakimlar WHERE id = ?', [req.params.id]);
            if (bakim.length > 0) {
                await db.query('UPDATE araclar SET durum = "Müsait" WHERE id = ?', [bakim[0].arac_id]);
            }
        }

        res.json({ message: 'Bakım kaydı başarıyla güncellendi' });
    } catch (error) {
        console.error('Bakım güncelleme hatası:', error);
        res.status(500).json({ error: 'Bakım güncellenirken bir hata oluştu' });
    }
});

// Bakım kontrolü
router.get('/kontrol', async (req, res) => {
    try {
        // Planlanan bakımları kontrol et
        const [bakimlar] = await db.query(`
            SELECT b.*, a.marka, a.model, a.plaka, a.km 
            FROM bakimlar b
            JOIN araclar a ON b.arac_id = a.id
            WHERE b.bakim_turu = 'Planlanan' 
            AND b.bildirim_durumu = 'Beklemede'
            AND b.planlanan_km - a.km <= 1000
        `);

        // Yaklaşan bakımları bildir
        const bildirimler = bakimlar.map(bakim => ({
            arac: `${bakim.marka} ${bakim.model} (${bakim.plaka})`,
            kalan_km: bakim.planlanan_km - bakim.km,
            bakim_turu: bakim.bakim_islem,
            mesaj: `${bakim.planlanan_km - bakim.km} km sonra ${bakim.bakim_islem} yapılması gerekiyor`
        }));

        // Bildirimi yapılan bakımları güncelle
        if (bakimlar.length > 0) {
            const bakimIds = bakimlar.map(b => b.id);
            await db.query(
                'UPDATE bakimlar SET bildirim_durumu = "Bildirildi" WHERE id IN (?)',
                [bakimIds]
            );
        }

        res.json(bildirimler);
    } catch (error) {
        console.error('Bakım kontrolü hatası:', error);
        res.status(500).json({ error: 'Bakım kontrolü sırasında bir hata oluştu' });
    }
});

// Bakım onaylama
router.post('/:id/onayla', async (req, res) => {
    try {
        // Önce bakım bilgilerini al
        const [bakim] = await db.query('SELECT * FROM bakimlar WHERE id = ?', [req.params.id]);
        if (bakim.length === 0) {
            return res.status(404).json({ error: 'Bakım kaydı bulunamadı' });
        }

        // Yeni bir bakım kaydı oluştur
        await db.query(
            'INSERT INTO bakimlar (arac_id, bakim_turu, bakim_islem, bakim_tarihi, bakim_ucret, aciklama, durum) VALUES (?, ?, ?, CURRENT_DATE, ?, ?, ?)',
            [bakim[0].arac_id, 'Yapılan', bakim[0].bakim_islem, 0, `${bakim[0].bakim_islem} yapıldı`, 'Tamamlandı']
        );

        // Planlanan bakımı güncelle
        await db.query(
            'UPDATE bakimlar SET durum = "Tamamlandı", bildirim_durumu = "Tamamlandı" WHERE id = ?',
            [req.params.id]
        );

        // Aracın durumunu güncelle
        await db.query('UPDATE araclar SET durum = "Müsait" WHERE id = ?', [bakim[0].arac_id]);

        res.json({ message: 'Bakım başarıyla onaylandı' });
    } catch (error) {
        console.error('Bakım onaylama hatası:', error);
        res.status(500).json({ error: 'Bakım onaylanırken bir hata oluştu' });
    }
});

// Bakım silme endpoint'i ekleyelim
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM bakimlar WHERE id = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Bakım kaydı bulunamadı' });
        }

        res.json({ message: 'Bakım kaydı başarıyla silindi' });
    } catch (error) {
        console.error('Bakım silme hatası:', error);
        res.status(500).json({ error: 'Bakım silinirken bir hata oluştu' });
    }
});

// Tek bir bakımı getir
router.get('/:id', async (req, res) => {
    try {
        const [bakim] = await db.query('SELECT * FROM bakimlar WHERE id = ?', [req.params.id]);
        if (bakim.length === 0) {
            return res.status(404).json({ error: 'Bakım kaydı bulunamadı' });
        }
        res.json(bakim[0]);
    } catch (error) {
        console.error('Bakım getirme hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

module.exports = router; 