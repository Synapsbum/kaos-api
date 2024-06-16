const express = require('express');
const { sql, connectDB } = require('../db'); // db.js dosyan?z?n yolu

const router = express.Router();

router.get('/:credentials', async (req, res) => {
    try {
        connectDB();
        const { credentials } = req.params;
        const [username, pass, guid] = credentials.split('&');

        // SQL prosedürünü ça??rma
        const result = await executeProcedure(username, pass, guid);

        // Prosedürün dönü? de?erini kullanma
        if (result) {
            // Prosedürün dönü? de?erini API yan?t?nda kullan
            res.json({
                Status: result.KOD,
                Token: result.Token,
                TokenID: result.TokenID,
                CustomerID: result.CustomerID
            });
        } else {
            // Kullan?c? bulunamazsa 404 hatas? döndür
            res.status(404).json({ Status: 'ERR' });
        }
    } catch (error) {
        // ?stisna durumlar?nda 500 hatas? döndür
        console.error('Kullan?c? bilgisi al?namad?:', error.message);
        res.status(500).json({ Status: 'ERR2' });
    }
});

// SQL prosedürünü ça??rma fonksiyonu
async function executeProcedure(username, pass, guid) {
    const request = new sql.Request();
    request.input('username', sql.NVarChar, username);
    request.input('pass', sql.NVarChar, pass);
    request.input('guid', sql.NVarChar, guid);
    
    const result = await request.execute('Loader_Login');

    // Prosedürün dönü? de?erini kontrol etme
    if (result.recordset.length > 0) {
        const KOD = result.recordset[0].KOD;
        const Token = result.recordset[0].Token;
        const TokenID = result.recordset[0].TokenID;
        const CustomerID = result.recordset[0].CustomerID;
        return { KOD, Token, TokenID, CustomerID }; // KOD, Token ve TokenID de?erlerini döndür
    } else {
        return null;
    }
}

module.exports = router;
