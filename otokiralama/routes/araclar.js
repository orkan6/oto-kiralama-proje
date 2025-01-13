const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Multer Ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'arac-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024 // 2 MB
    }
});

// Araç Bakım Bildirimleri
router.get('/bakim-bildirimleri', async (req, res) => {
    try {
        const [bildirimler] = await db.query(`
            SELECT 
                a.id as arac_id,
                a.marka,
                a.model,
                a.plaka,
                a.km as mevcut_km,
                b.id as bakim_id,
                b.bakim_turu,
                b.bakim_islem,
                b.planlanan_km,
                b.durum,
                b.bildirim_durumu,
                (b.planlanan_km - a.km) as kalan_km
            FROM araclar a
            INNER JOIN bakimlar b ON a.id = b.arac_id
            WHERE b.bakim_turu = 'Planlanan'
                AND b.durum = 'Beklemede'
                AND b.bildirim_durumu != 'Tamamlandı'
                AND (
                    (b.planlanan_km - a.km) <= 1000
                    OR (b.planlanan_km - a.km) <= 0
                )
            ORDER BY (b.planlanan_km - a.km) ASC
        `);

        if (bildirimler.length > 0) {
            const bakimIds = bildirimler.map(b => b.bakim_id);
            await db.query(`
                UPDATE bakimlar 
                SET bildirim_durumu = 'Bildirildi' 
                WHERE id IN (?)
            `, [bakimIds]);
        }

        res.json(bildirimler);
    } catch (error) {
        console.error('Bakım bildirimleri hatası:', error);
        res.status(500).json({ error: 'Bakım bildirimleri alınamadı', details: error.message });
    }
});

// Tüm Araçları Listeleme
router.get('/', async (req, res) => {
    try {
        const [araclar] = await db.query(
            'SELECT * FROM araclar WHERE aktif = 1 ORDER BY id DESC'
        );
        res.json(araclar);
    } catch (error) {
        console.error('Araçlar listelenirken hata:', error);
        res.status(500).json({ error: 'Araçlar alınamadı' });
    }
});

// Belirli Araç Detayı
router.get('/:id', async (req, res) => {
    try {
        const [arac] = await db.query('SELECT * FROM araclar WHERE id = ?', [req.params.id]);
        if (arac.length === 0) {
            return res.status(404).json({ error: 'Araç bulunamadı' });
        }
        res.json(arac[0]);
    } catch (error) {
        console.error('Araç detayı hatası:', error);
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

// Yeni Araç Ekleme
router.post('/', upload.single('foto'), async (req, res) => {
    try {
        const { marka, model, plaka, yil, renk, vites, yakit, gunluk_ucret } = req.body;
        const foto = req.file?.filename;

        if (!marka || !model || !plaka || !yil || !renk || !vites || !yakit || !gunluk_ucret) {
            return res.status(400).json({ error: 'Tüm alanlar doldurulmalıdır!' });
        }

        const [result] = await db.query(`
            INSERT INTO araclar (
                marka, model, plaka, yil, renk, 
                vites, yakit, gunluk_ucret, foto, 
                aktif, durum
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'Müsait')
        `, [marka, model, plaka, yil, renk, vites, yakit, gunluk_ucret, foto]);

        res.json({ id: result.insertId, message: 'Araç başarıyla eklendi' });
    } catch (error) {
        console.error('Araç ekleme hatası:', error);
        res.status(500).json({ error: 'Araç eklenirken bir hata oluştu' });
    }
});

// Araç Güncelleme
router.put('/:id', upload.single('foto'), async (req, res) => {
    try {
        const { id } = req.params;
        const { marka, model, plaka, yil, renk, vites, yakit, gunluk_ucret } = req.body;
        const foto = req.file?.filename;

        const query = `
            UPDATE araclar 
            SET 
                marka = ?, model = ?, plaka = ?, yil = ?, renk = ?, 
                vites = ?, yakit = ?, gunluk_ucret = ?
                ${foto ? ', foto = ?' : ''}
            WHERE id = ? AND aktif = 1
        `;

        const params = [marka, model, plaka, yil, renk, vites, yakit, gunluk_ucret];
        if (foto) params.push(foto);
        params.push(id);

        await db.query(query, params);

        res.json({ message: 'Araç başarıyla güncellendi' });
    } catch (error) {
        console.error('Araç güncelleme hatası:', error);
        res.status(500).json({ error: 'Araç güncellenirken bir hata oluştu' });
    }
});

// Araç Silme
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [aktifKiralamalar] = await db.query(
            'SELECT COUNT(*) as count FROM kiralamalar WHERE arac_id = ? AND durum = "Aktif"',
            [id]
        );

        if (aktifKiralamalar[0].count > 0) {
            return res.status(400).json({ error: 'Bu araç şu anda kirada olduğu için silinemez.' });
        }

        await db.query(
            'UPDATE araclar SET durum = "Silindi", aktif = 0 WHERE id = ?',
            [id]
        );

        res.json({ message: 'Araç başarıyla silindi' });
    } catch (error) {
        console.error('Araç silme hatası:', error);
        res.status(500).json({ error: 'Araç silinirken bir hata oluştu' });
    }
});

// Araç Bakım Geçmişi
router.get('/:id/bakimlar', async (req, res) => {
    try {
        const [bakimlar] = await db.query(
            'SELECT * FROM bakimlar WHERE arac_id = ? ORDER BY bakim_tarihi DESC',
            [req.params.id]
        );
        res.json(bakimlar);
    } catch (error) {
        console.error('Bakım geçmişi hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

// Araç Hasar Geçmişi
router.get('/:id/hasarlar', async (req, res) => {
    try {
        const [hasarlar] = await db.query(`
            SELECT h.* 
            FROM hasarlar h
            JOIN kiralamalar k ON h.kiralama_id = k.id
            WHERE k.arac_id = ?
            ORDER BY h.hasar_tarihi DESC
        `, [req.params.id]);
        res.json(hasarlar);
    } catch (error) {
        console.error('Hasar geçmişi hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

module.exports = router;
