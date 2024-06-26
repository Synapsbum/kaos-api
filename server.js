const express = require('express');
const { sql, connectDB } = require('./db'); // db.js dosyan?z?n yolu
const getUser = require('./Valorant/GetUser');
const getUserN = require('./Valorant/GetUserN');
const Loader_Login = require('./Valorant/Loader_Login');
const Update = require('./Valorant/Update');
const SubCheck = require('./Valorant/SubCheck');
const Info = require('./Product/Info');
const GetCatProducts = require('./Product/GetCatProducts');
const PDownload = require('./Product/Download');
const GetSubs = require('./Valorant/GetSubs');
const Web_Login = require('./Valorant/Web_Login');

const app = express();

connectDB();
// Di?er express middleware ve route tan?mlamalar?...

// Sunucuyu belirli bir port �zerinden dinlemek i�in
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda ba?lat?ld?.`);
});
app.get('/db', (req, res) => {
    connectDB();
});
app.get('/API/as', (req, res) => {
    res.send('dsdsdsasda.0.1');
});
//Generic

app.use('/Product/Info', Info);
app.use('/Product/GetCatProducts', GetCatProducts);
app.use('/Product/Download', PDownload);

//Valorant
app.use('/Valorant/GetUser', getUser);
app.use('/Valorant/GetUserN', getUserN);
app.use('/Valorant/LoaderLogin', Loader_Login);
app.use('/Valorant/WebLogin', Web_Login);
app.use('/Valorant/Update', Update);
app.use('/Valorant/SubCheck', SubCheck);
app.use('/Valorant/Lisans', GetSubs);

//Rust
app.get('/', function (req, res) {
    res.send('KAOSCHEATS REST API v1.1.20.1');
});
