const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Araç hasarlarını getir
router.get('/kiralamalar/:kiralamaId/hasarlar', async (req, res) => {
    try {
        const hasarlar = await db.query(
            `SELECT * FROM hasarlar WHERE kiralama_id = $1 ORDER BY hasar_tarihi DESC`,
            [req.params.kiralamaId]
        );
        res.json(hasarlar.rows);
    } catch (error) {
        console.error('Hasar kayıtları getirme hatası:', error);
        res.status(500).json({ error: 'Hasar kayıtları alınamadı' });
    }
});

// Yeni hasar kaydı ekle
router.post('/hasarlar', async (req, res) => {
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN');

        const {
            kiralama_id,
            hasar_turu,
            hasar_ucret,
            aciklama,
            hasar_tarihi
        } = req.body;

        // Hasar kaydını ekle
        const hasarResult = await client.query(
            `INSERT INTO hasarlar (
                kiralama_id, 
                hasar_turu, 
                hasar_ucret,
                aciklama,
                hasar_tarihi,
                durum
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [kiralama_id, hasar_turu, hasar_ucret, aciklama, hasar_tarihi, 'İşlemde']
        );

        await client.query('COMMIT');
        res.json(hasarResult.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Hasar kaydı ekleme hatası:', error);
        res.status(500).json({ error: 'Hasar kaydı eklenemedi' });
    } finally {
        client.release();
    }
});

// Hasar durumunu güncelle
router.put('/hasarlar/:id', async (req, res) => {
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN');

        const { durum } = req.body;
        const hasarId = req.params.id;

        // Hasar kaydını güncelle
        const hasarResult = await client.query(
            `UPDATE hasarlar 
             SET durum = $1
             WHERE id = $2 
             RETURNING *`,
            [durum, hasarId]
        );

        await client.query('COMMIT');
        res.json(hasarResult.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Hasar durumu güncelleme hatası:', error);
        res.status(500).json({ error: 'Hasar durumu güncellenemedi' });
    } finally {
        client.release();
    }
});

module.exports = router; 