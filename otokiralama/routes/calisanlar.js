const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Tüm çalışanları getir
router.get('/', async (req, res) => {
    try {
        const [calisanlar] = await db.query('SELECT * FROM calisanlar ORDER BY id DESC');
        res.json(calisanlar);
    } catch (error) {
        console.error('Çalışan listesi hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

// Tek bir çalışanı getir
router.get('/:id', async (req, res) => {
    try {
        const [calisan] = await db.query('SELECT * FROM calisanlar WHERE id = ?', [req.params.id]);
        if (calisan.length === 0) {
            return res.status(404).json({ error: 'Çalışan bulunamadı' });
        }
        res.json(calisan[0]);
    } catch (error) {
        console.error('Çalışan getirme hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

// Yeni çalışan ekle
router.post('/', async (req, res) => {
    try {
        const { ad, soyad, tc_no, telefon, email, pozisyon, maas, ise_baslama_tarihi, durum } = req.body;

        // Zorunlu alanları kontrol et
        if (!ad || !soyad || !tc_no || !telefon || !email || !pozisyon || !maas || !ise_baslama_tarihi) {
            return res.status(400).json({
                error: 'Tüm alanlar zorunludur',
                required: ['ad', 'soyad', 'tc_no', 'telefon', 'email', 'pozisyon', 'maas', 'ise_baslama_tarihi']
            });
        }

        const [result] = await db.query(
            'INSERT INTO calisanlar (ad, soyad, tc_no, telefon, email, pozisyon, maas, ise_baslama_tarihi, durum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ad, soyad, tc_no, telefon, email, pozisyon, maas, ise_baslama_tarihi, durum || 'Aktif']
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Çalışan başarıyla eklendi'
        });
    } catch (error) {
        console.error('Çalışan ekleme hatası:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: 'Bu TC No ile kayıtlı başka bir çalışan bulunmaktadır'
            });
        }
        res.status(500).json({ error: 'Çalışan eklenirken bir hata oluştu' });
    }
});

// Çalışan güncelle
router.put('/:id', async (req, res) => {
    try {
        const { ad, soyad, tc_no, telefon, email, pozisyon, maas, ise_baslama_tarihi, durum } = req.body;

        const [result] = await db.query(
            'UPDATE calisanlar SET ad=?, soyad=?, tc_no=?, telefon=?, email=?, pozisyon=?, maas=?, ise_baslama_tarihi=?, durum=? WHERE id=?',
            [ad, soyad, tc_no, telefon, email, pozisyon, maas, ise_baslama_tarihi, durum || 'Aktif', req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Çalışan bulunamadı' });
        }

        res.json({ message: 'Çalışan başarıyla güncellendi' });
    } catch (error) {
        console.error('Çalışan güncelleme hatası:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: 'Bu TC No ile kayıtlı başka bir çalışan bulunmaktadır'
            });
        }
        res.status(500).json({ error: 'Çalışan güncellenirken bir hata oluştu' });
    }
});

// Çalışan sil
router.delete('/:id', async (req, res) => {
    try {
        // Önce çalışanın aktif kiralaması var mı kontrol et
        const [kiralamalar] = await db.query(
            'SELECT id FROM kiralamalar WHERE calisan_id = ? AND durum = "Aktif"',
            [req.params.id]
        );

        if (kiralamalar.length > 0) {
            return res.status(400).json({
                error: 'Bu çalışanın aktif kiralamaları bulunmaktadır. Önce kiralamaları sonlandırın.'
            });
        }

        const [result] = await db.query('DELETE FROM calisanlar WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Çalışan bulunamadı' });
        }

        res.json({ message: 'Çalışan başarıyla silindi' });
    } catch (error) {
        console.error('Çalışan silme hatası:', error);
        res.status(500).json({ error: 'Çalışan silinirken bir hata oluştu' });
    }
});

module.exports = router; 