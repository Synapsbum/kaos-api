const express = require('express');
const { sql, connectDB } = require('../db'); // db.js dosyan?z?n yolu

const router = express.Router();

router.get('/:guid', async (req, res) => {
    try {
        connectDB();
        const guid = req.params.guid;

        // SQL prosed�r�n� �a??rma
        const result = await executeProcedure(guid);

        // Prosed�r�n d�n�? de?erini kullanma
        if (result) {
            // Prosed�r�n d�n�? de?erini API yan?t?nda kullan
            res.json({ Status: result });
        } else {
            // Kullan?c? bulunamazsa 404 hatas? d�nd�r
            res.status(404).json({ Status: 'ERR' });
        }
    } catch (error) {
        // ?stisna durumlar?nda 500 hatas? d�nd�r
        console.error('Sezon bilgisi al?namad?:', error.message);
        res.status(500).json({ Status: 'ERR2' });
    }
});

// SQL prosed�r�n� �a??rma fonksiyonu
async function executeProcedure(guid) {
    const request = new sql.Request();
    request.input('guid', sql.NVarChar, guid);
    const result = await request.execute('Update_Cheat');

    // Prosed�r�n d�n�? de?erini kontrol etme
    if (result.recordset.length > 0) {
        return result.recordset[0].KOD;
    } else {
        return null;
    }
}

module.exports = router;
