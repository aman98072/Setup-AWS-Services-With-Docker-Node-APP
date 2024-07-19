require('dotenv').config(); // load enviorment
require('./libraries/database/database'); // load mysql database
const { selectAll } = require('./model/city/m_city');

const express = require('express');
const app = express();
const port = 8001;

app.get('/', (req, res) => {
    res.send('Simple Node JS APP with Docker');
});

app.get('/cities', async (req, res) => {
    const data = await selectAll();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Localhost running on this URL : http://localhost:${port}`);
});
