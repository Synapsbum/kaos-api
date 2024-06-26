const sql = require('mssql');

// MSSQL veritaban? ba?lant? bilgileri
const config = {
    user: 'sa',
    password: '159753CodeX!',
    server: '127.0.0.1',
    database: 'KaosCheats',
    options: {
        encrypt: true, // Veritaban? ba?lant?s?n? ?ifrelemek i�in
        trustServerCertificate: true // G�venilir bir sertifikaya sahip olmayan sunucularla �al???rken gereklidir
    }
};

// MSSQL veritaban?na ba?lanmak i�in fonksiyon
async function connectDB(req, res) {
    let connectionTimeout = 5000; // Ba?lant? zaman a??m? s�resi (milisaniye cinsinden), 30 saniye
    try {
        await Promise.race([
            sql.connect(config),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Ba?lant? zaman a??m?na u?rad?')), connectionTimeout))
        ]);
        console.log('MSSQL veritaban?na ba?ar?yla ba?land?.');
    } catch (err) {
        console.error('MSSQL veritaban?na ba?lan?rken hata olu?tu:', err);
        res.status(500).json({ error: 'MSSQL veritaban?na ba?lan?rken hata olu?tu' });
        return; // Fonksiyondan �?k
    }
}

module.exports = { sql, connectDB };
