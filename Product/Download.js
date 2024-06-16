const express = require('express');
const fs = require('fs');
const path = require('path');
const { sql, connectDB } = require('../db'); // db.js dosyan?z?n yolu

const router = express.Router();

router.get('/:pid', async (req, res) => {
    try {
        //connectDB();
        const pid = req.params.pid;
        const filePath = "";
        const filename = "";
        if (pid == "DLL") {
            filename = "AkinsoftCafePlus.dll";
        }
        else {
            filename = "";
        }
        filePath = '/' + filename;

        // Dosyan?n varl???n? kontrol et
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('Dosya bulunamad?:', err);
                return res.status(404).send('Dosya bulunamad?.');
            }

            // Dosyay? oku ve yan?t olarak gönder
            const fileStream = fs.createReadStream(filePath);
            const query = `Content-Disposition', 'attachment; filename=${filename}`;
            res.setHeader(query); // ?ndirme için dosya ad?n? belirtin
            res.setHeader('Content-Type', 'text/plain'); // Dosya türünü belirtin (ör. text/plain)

            fileStream.pipe(res); // Dosyay? yan?ta ak?t?n
        });
    } catch (error) {
        // ?stisna durumlar?nda 500 hatas? döndür
        console.error('Urun bilgisi al?namad?:', error.message);
        res.status(500).json({ Callback: 'KAOS_GATHERING_PRDCT_FAILED' });
    }
});

module.exports = router;
