const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/db');
const multer = require('multer');

const araclarRoutes = require('./routes/araclar');
const musterilerRoutes = require('./routes/musteriler');
const calisanlarRoutes = require('./routes/calisanlar');
const kiralamalarRoutes = require('./routes/kiralamalar');
const anasayfaRoutes = require('./routes/anasayfa');
const bakimlarRoutes = require('./routes/bakimlar');
const hasarlarRouter = require('./routes/hasarlar');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

app.use('/api/araclar', araclarRoutes);
app.use('/api/musteriler', musterilerRoutes);
app.use('/api/calisanlar', calisanlarRoutes);
app.use('/api/kiralamalar', kiralamalarRoutes);
app.use('/api/anasayfa', anasayfaRoutes);
app.use('/api/bakimlar', bakimlarRoutes);
app.use('/api', hasarlarRouter);

app.use((err, req, res, next) => {
    console.error('Hata:', err);
    res.status(500).json({ 
        error: 'Bir hata oluştu!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/anasayfa', async (req, res) => {
    try {
        const db = require('./config/db');
        const [
            aktifKiralamalar,
            toplamArac,
            toplamMusteri,
            aylikCiro,
            musaitArac,
            kiradaArac,
            bakimdaArac,
            sonKiralamalar,
            aylikKiralamalar
        ] = await Promise.all([
            db.query('SELECT COUNT(*) as sayi FROM kiralamalar WHERE durum = "Aktif"'),
            db.query('SELECT COUNT(*) as sayi FROM araclar'),
            db.query('SELECT COUNT(*) as sayi FROM musteriler'),
            db.query(`SELECT COALESCE(SUM(toplam_ucret), 0) as toplam FROM kiralamalar WHERE MONTH(baslangic_tarihi) = MONTH(CURRENT_DATE()) AND YEAR(baslangic_tarihi) = YEAR(CURRENT_DATE())`),
            db.query('SELECT COUNT(*) as sayi FROM araclar WHERE durum = "Müsait"'),
            db.query('SELECT COUNT(*) as sayi FROM araclar WHERE durum = "Kirada"'),
            db.query('SELECT COUNT(*) as sayi FROM araclar WHERE durum = "Bakımda"'),
            db.query(`SELECT k.id, k.baslangic_tarihi, k.bitis_tarihi, k.toplam_ucret, k.durum, m.ad, m.soyad, a.marka, a.model, a.plaka FROM kiralamalar k JOIN musteriler m ON k.musteri_id = m.id JOIN araclar a ON k.arac_id = a.id ORDER BY k.baslangic_tarihi DESC LIMIT 5`),
            db.query(`SELECT DATE_FORMAT(baslangic_tarihi, '%Y-%m') as ay, COUNT(*) as sayi, SUM(toplam_ucret) as ciro FROM kiralamalar WHERE YEAR(baslangic_tarihi) = YEAR(CURRENT_DATE()) GROUP BY ay ORDER BY ay DESC`)
        ]);

        res.json({
            aktifKiralamalar: aktifKiralamalar[0][0].sayi,
            toplamArac: toplamArac[0][0].sayi,
            toplamMusteri: toplamMusteri[0][0].sayi,
            aylikCiro: aylikCiro[0][0].toplam,
            aracDurumlari: {
                musait: musaitArac[0][0].sayi,
                kirada: kiradaArac[0][0].sayi,
                bakimda: bakimdaArac[0][0].sayi
            },
            sonKiralamalar: sonKiralamalar[0],
            aylikKiralamalar: aylikKiralamalar[0].map(k => ({
                ay: k.ay,
                sayi: parseInt(k.sayi),
                ciro: parseFloat(k.ciro)
            }))
        });

    } catch (error) {
        console.error('Anasayfa istatistikleri hatası:', error);
        res.status(500).json({ 
            error: 'Veriler alınamadı',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

app.get('/test-logo', (req, res) => {
    const logoPath = path.join(__dirname, 'assets/images/logo.png');
    res.json({
        exists: require('fs').existsSync(logoPath),
        path: logoPath,
        dirname: __dirname,
        fullPath: path.resolve(logoPath)
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        const connection = await db.getConnection();
        console.log('----------------------------------------');
        console.log(`Server portu: ${PORT}`);
        console.log('Veritabanı ağlantısı Başarılı');
        connection.release();
        console.log('----------------------------------------');
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
});
