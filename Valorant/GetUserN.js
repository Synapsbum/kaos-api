const express = require('express');
const { sql, connectDB } = require('../db'); // db.js dosyan?z?n yolu

const router = express.Router();

router.get('/:username', async (req, res) => {
    try {
        //connectDB();
        const username = req.params.username;
        const query = `SELECT * FROM Users WHERE username = '${username}'`;
        const result = await sql.query(query);

        // Kullan?c? bulunduysa, bilgileri JSON format?nda döndür
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            // Kullan?c? bulunamazsa 404 hatas? döndür
            res.status(404).json({ Callback: 'KAOS_USER_NOT_FOUND' });
        }
    } catch (error) {
        // ?stisna durumlar?nda 500 hatas? döndür
        console.error('Kullan?c? bilgisi al?namad?:', error.message);
        res.status(500).json({ Callback: 'KAOS_GATHERING_USER_FAILED' });
    }
});

module.exports = router;
