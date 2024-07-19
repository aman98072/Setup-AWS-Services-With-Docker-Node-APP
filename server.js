const express = require('express');
const app = express();
const port = 8001;

app.get('/home', (req, res) => {
    res.send('hello 1');
});

app.listen(port, () => {
    console.log(`Localhost running on this URL : http://localhost:${port}`);
});
