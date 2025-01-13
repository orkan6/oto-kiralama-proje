const express = require('express');
const router = express.Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
    try {
        const [kiralamalar] = await db.query(`
            SELECT k.*, 
                   m.ad as musteri_ad, m.soyad as musteri_soyad,
                   a.marka, a.model, a.plaka,
                   c.ad as calisan_ad, c.soyad as calisan_soyad
            FROM kiralamalar k
            LEFT JOIN musteriler m ON k.musteri_id = m.id
            LEFT JOIN araclar a ON k.arac_id = a.id
            LEFT JOIN calisanlar c ON k.calisan_id = c.id
            ORDER BY k.baslangic_tarihi DESC
        `);
        res.json(kiralamalar);
    } catch (error) {
        console.error('Kiralama listesi hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const [kiralama] = await db.query(`
            SELECT k.*, 
                   m.ad as musteri_ad, m.soyad as musteri_soyad,
                   a.marka, a.model, a.plaka
            FROM kiralamalar k
            LEFT JOIN musteriler m ON k.musteri_id = m.id
            LEFT JOIN araclar a ON k.arac_id = a.id
            WHERE k.id = ?
        `, [req.params.id]);

        if (kiralama.length === 0) {
            return res.status(404).json({ error: 'Kiralama bulunamadı' });
        }
        res.json(kiralama[0]);
    } catch (error) {
        console.error('Kiralama getirme hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { musteri_id, arac_id, baslangic_tarihi, bitis_tarihi, gunluk_ucret } = req.body;
        if (!musteri_id || !arac_id || !baslangic_tarihi || !bitis_tarihi ) {
            return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
        }
        const [arac] = await db.query('SELECT km FROM araclar WHERE id = ?', [arac_id]);
        const alis_km = arac[0]?.km || 0;
        const baslangic = new Date(baslangic_tarihi);
        const bitis = new Date(bitis_tarihi);
        const toplam_gun = Math.ceil((bitis - baslangic) / (1000 * 60 * 60 * 24));
        const toplam_ucret = toplam_gun * gunluk_ucret;
        const calisan_id = 1;

        const [result] = await db.query(
            'INSERT INTO kiralamalar (musteri_id, arac_id, calisan_id, baslangic_tarihi, bitis_tarihi, gunluk_ucret, toplam_gun, toplam_ucret, durum, alis_km) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [musteri_id, arac_id, calisan_id, baslangic_tarihi, bitis_tarihi, gunluk_ucret, toplam_gun, toplam_ucret, 'Aktif', alis_km]
        );
        await db.query('UPDATE araclar SET durum = "Kirada" WHERE id = ?', [arac_id]);

        res.status(201).json({
            id: result.insertId,
            message: 'Kiralama başarıyla oluşturuldu'
        });
    } catch (error) {
        console.error('Kiralama ekleme hatası:', error);
        res.status(500).json({ error: 'Kiralama eklenirken bir hata oluştu' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { musteri_id, arac_id, baslangic_tarihi, bitis_tarihi, gunluk_ucret, durum, odeme_durumu } = req.body;
        const [mevcutKiralama] = await db.query('SELECT * FROM kiralamalar WHERE id = ?', [req.params.id]);
        if (mevcutKiralama.length === 0) {
            return res.status(404).json({ error: 'Kiralama bulunamadı' });
        }
        if (mevcutKiralama[0].arac_id !== arac_id) {
            await db.query('UPDATE araclar SET durum = "Müsait" WHERE id = ?', [mevcutKiralama[0].arac_id]);
        }
        const baslangic = new Date(baslangic_tarihi);
        const bitis = new Date(bitis_tarihi);
        const toplam_gun = Math.ceil((bitis - baslangic) / (1000 * 60 * 60 * 24));
        const toplam_ucret = toplam_gun * gunluk_ucret;
        const [result] = await db.query(
            'UPDATE kiralamalar SET musteri_id=?, arac_id=?, baslangic_tarihi=?, bitis_tarihi=?, gunluk_ucret=?, toplam_gun=?, toplam_ucret=?, durum=?, odeme_durumu=? WHERE id=?',
            [musteri_id, arac_id, baslangic_tarihi, bitis_tarihi, gunluk_ucret, toplam_gun, toplam_ucret, durum || 'Aktif', odeme_durumu || 'Bekliyor', req.params.id]
        );
        if (durum === 'Aktif') {
            await db.query('UPDATE araclar SET durum = "Kirada" WHERE id = ?', [arac_id]);
        } else if (durum === 'Tamamlandı' || durum === 'İptal') {
            await db.query('UPDATE araclar SET durum = "Müsait" WHERE id = ?', [arac_id]);
        }

        res.json({ 
            message: 'Kiralama başarıyla güncellendi',
            id: req.params.id
        });
    } catch (error) {
        console.error('Kiralama güncelleme hatası:', error);
        res.status(500).json({ 
            error: 'Kiralama güncellenirken bir hata oluştu',
            details: error.message 
        });
    }
});
router.post('/:id/teslim', async (req, res) => {
    try {
        const {
            teslim_km,
            teslim_tarihi,
            odeme_durumu,
            hasar_durumu,
            hasar_turu,
            hasar_aciklama,
            hasar_ucret
        } = req.body;
        await db.query(
            `UPDATE kiralamalar 
             SET teslim_km = ?,
                 teslim_tarihi = ?,
                 odeme_durumu = ?,
                 durum = 'Tamamlandı'
             WHERE id = ?`,
            [teslim_km, teslim_tarihi, odeme_durumu, req.params.id]
        );
        const [kiralama] = await db.query(
            'SELECT * FROM kiralamalar WHERE id = ?',
            [req.params.id]
        );

        if (!kiralama || kiralama.length === 0) {
            throw new Error('Kiralama bulunamadı');
        }
        let aracDurum = 'Müsait';
        if (hasar_durumu === 'var') {
            aracDurum = 'Bakımda';
            await db.query(
                `INSERT INTO hasarlar (
                    kiralama_id,
                    hasar_turu,
                    hasar_ucret,
                    aciklama,
                    hasar_tarihi,
                    durum
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [kiralama[0].id, hasar_turu, hasar_ucret, hasar_aciklama, teslim_tarihi, 'İşlemde']
            );
        }
        await db.query(
            `UPDATE araclar 
             SET durum = ?, 
                 km = ? 
             WHERE id = ?`,
            [aracDurum, teslim_km, kiralama[0].arac_id]
        );
        const baslangic = new Date(kiralama[0].baslangic_tarihi);
        const bitis = new Date(teslim_tarihi);
        const gercek_gun = Math.ceil((bitis - baslangic) / (1000 * 60 * 60 * 24));
        const toplam_ucret = gercek_gun * kiralama[0].gunluk_ucret;
        const km_fark = teslim_km - kiralama[0].alis_km;

        res.json({
            durum_mesaji: 'Araç başarıyla teslim alındı',
            gercek_gun,
            toplam_ucret,
            km_fark
        });
    } catch (error) {
        console.error('Araç teslim alma hatası:', error);
        res.status(500).json({ error: 'Araç teslim alınamadı: ' + error.message });
    }
});

module.exports = router; 