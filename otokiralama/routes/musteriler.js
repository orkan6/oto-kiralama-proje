const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Tüm müşterileri getir
router.get('/', async (req, res) => {
    try {
        const [musteriler] = await db.query('SELECT * FROM musteriler ORDER BY id DESC');
        res.json(musteriler);
    } catch (error) {
        console.error('Müşteri listesi hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

// Tek bir müşteriyi getir
router.get('/:id', async (req, res) => {
    try {
        const [musteri] = await db.query('SELECT * FROM musteriler WHERE id = ?', [req.params.id]);
        if (musteri.length === 0) {
            return res.status(404).json({ error: 'Müşteri bulunamadı' });
        }
        res.json(musteri[0]);
    } catch (error) {
        console.error('Müşteri getirme hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

// Yeni müşteri ekle
router.post('/', async (req, res) => {
    try {
        console.log('Gelen müşteri verisi:', req.body);
        const { ad, soyad, tc_no, telefon, email, ehliyet_sinifi, adres } = req.body;

        // Zorunlu alanları kontrol et
        if (!ad || !soyad || !tc_no || !ehliyet_sinifi) {
            return res.status(400).json({
                error: 'Zorunlu alanlar eksik',
                required: ['ad', 'soyad', 'tc_no', 'ehliyet_sinifi']
            });
        }

        const [result] = await db.query(
            'INSERT INTO musteriler (ad, soyad, tc_no, telefon, email, ehliyet_sinifi, adres) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ad, soyad, tc_no, telefon, email, ehliyet_sinifi, adres]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Müşteri başarıyla eklendi'
        });
    } catch (error) {
        console.error('Müşteri ekleme hatası:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: 'Bu TC No veya Ehliyet No ile kayıtlı müşteri bulunmaktadır'
            });
        }
        res.status(500).json({ error: 'Müşteri eklenirken bir hata oluştu' });
    }
});

// Müşteri güncelle
router.put('/:id', async (req, res) => {
    try {
        const { ad, soyad, tc_no, telefon, email, ehliyet_sinifi, adres } = req.body;

        const [result] = await db.query(
            'UPDATE musteriler SET ad=?, soyad=?, tc_no=?, telefon=?, email=?, ehliyet_sinifi=?, adres=? WHERE id=?',
            [ad, soyad, tc_no, telefon, email, ehliyet_sinifi, adres, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Müşteri bulunamadı' });
        }

        res.json({ message: 'Müşteri başarıyla güncellendi' });
    } catch (error) {
        console.error('Müşteri güncelleme hatası:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: 'Bu TC No veya Ehliyet No ile kayıtlı başka bir müşteri bulunmaktadır'
            });
        }
        res.status(500).json({ error: 'Müşteri güncellenirken bir hata oluştu' });
    }
});

// Müşteri sil
router.delete('/:id', async (req, res) => {
    try {
        // Önce müşterinin herhangi bir kiralaması var mı kontrol et
        const [kiralamalar] = await db.query(
            'SELECT id FROM kiralamalar WHERE musteri_id = ?',
            [req.params.id]
        );

        if (kiralamalar.length > 0) {
            return res.status(400).json({
                error: 'Bu müşterinin aktif kiralaması bulunmaktadır. Önce kiralamaları sonlandırın.'
            });
        }

        const [result] = await db.query('DELETE FROM musteriler WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Müşteri bulunamadı' });
        }

        res.json({ message: 'Müşteri başarıyla silindi' });
    } catch (error) {
        console.error('Müşteri silme hatası:', error);
        res.status(500).json({ error: 'Müşteri silinirken bir hata oluştu' });
    }
});

module.exports = router; 