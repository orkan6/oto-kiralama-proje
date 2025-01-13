const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ana sayfa istatistiklerini getir
router.get('/', async (req, res) => {
    try {
        // İstatistikleri tek bir sorguda al
        const [[stats]] = await db.query(`
            SELECT 
                (SELECT COUNT(*) FROM araclar WHERE durum = 'Müsait') as musait_arac,
                (SELECT COUNT(*) FROM araclar WHERE durum = 'Kirada') as kirada_arac,
                (SELECT COUNT(*) FROM araclar WHERE durum = 'Bakımda') as bakimda_arac,
                (SELECT COUNT(*) FROM musteriler) as toplam_musteri,
                (SELECT COUNT(*) FROM kiralamalar WHERE durum = 'Aktif') as aktif_kiralama,
                (SELECT COALESCE(SUM(toplam_ucret), 0) FROM kiralamalar 
                 WHERE MONTH(created_at) = MONTH(CURRENT_DATE)) as aylik_ciro
        `);

        res.json({
            aktifKiralamalar: stats.aktif_kiralama || 0,
            toplamArac: (stats.musait_arac + stats.kirada_arac + stats.bakimda_arac) || 0,
            toplamMusteri: stats.toplam_musteri || 0,
            aylikCiro: stats.aylik_ciro || 0,
            musaitArac: stats.musait_arac || 0,
            kiradaArac: stats.kirada_arac || 0,
            bakimdaArac: stats.bakimda_arac || 0
        });
    } catch (error) {
        console.error('Ana sayfa istatistikleri hatası:', error);
        res.status(500).json({ 
            error: 'İstatistikler alınırken bir hata oluştu',
            details: error.message 
        });
    }
});

// Araç performans verilerini getir
router.get('/arac-performans', async (req, res) => {
    try {
        const { araclar, tarihAraligi } = req.query;
        const aracIdler = araclar ? araclar.split(',').filter(id => id) : [];
        
        // Tarih aralığını hesapla
        const baslangicTarihi = new Date();
        const aralik = parseInt(tarihAraligi) || 30; // Varsayılan 30 gün

        // Seçilen aralığa göre başlangıç tarihini ayarla
        if (aralik === 30) {
            baslangicTarihi.setDate(baslangicTarihi.getDate() - 30); // Son 30 gün
        } else if (aralik === 90) {
            baslangicTarihi.setMonth(baslangicTarihi.getMonth() - 3); // Son 3 ay
        } else if (aralik === 180) {
            baslangicTarihi.setMonth(baslangicTarihi.getMonth() - 6); // Son 6 ay
        } else if (aralik === 365) {
            baslangicTarihi.setFullYear(baslangicTarihi.getFullYear() - 1); // Son 1 yıl
        }

        let query = `
            SELECT 
                a.id,
                a.marka,
                a.model,
                a.plaka,
                DATE_FORMAT(k.baslangic_tarihi, '%Y-%m') as ay,
                YEAR(k.baslangic_tarihi) as yil,
                MONTH(k.baslangic_tarihi) as ay_no,
                COUNT(k.id) as kiralama_sayisi,
                COALESCE(SUM(k.toplam_ucret), 0) as toplam_kazanc
            FROM araclar a
            LEFT JOIN kiralamalar k ON a.id = k.arac_id 
            WHERE k.baslangic_tarihi >= ?
            AND k.baslangic_tarihi <= CURRENT_DATE()
            AND a.aktif = 1
        `;

        const params = [baslangicTarihi];

        if (aracIdler.length > 0) {
            query += ` AND a.id IN (?)`;
            params.push(aracIdler);
        }

        query += `
            GROUP BY a.id, a.marka, a.model, a.plaka, ay, yil, ay_no
            ORDER BY yil ASC, ay_no ASC
        `;

        const [performansVerileri] = await db.query(query, params);

        // Ay isimlerini Türkçe olarak ekle
        const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        
        const veriler = performansVerileri.map(veri => ({
            ...veri,
            ay_adi: `${aylar[veri.ay_no - 1]} ${veri.yil}`
        }));
        
        res.json(veriler);
    } catch (error) {
        console.error('Araç performans verileri hatası:', error);
        res.status(500).json({ error: 'Veriler alınamadı' });
    }
});

module.exports = router; 