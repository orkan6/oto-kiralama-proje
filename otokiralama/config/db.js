require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Bağlantıyı test et
pool.getConnection()
    .then(connection => {
        console.log('MySQL bağlantısı başarılı');
        connection.release();
    })
    .catch(err => {
        console.error('MySQL bağlantı hatası:', err);
    });

module.exports = pool; 