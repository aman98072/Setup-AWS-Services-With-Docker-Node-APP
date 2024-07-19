const express = require('express');
const app = express();
const port = 8001;

app.get('/home', (req, res) => {
    res.send('Project setup by docker Mr. Aman Gupta');
});

app.listen(port, () => {
    console.log(`Localhost running on this URL : http://localhost:${port}`);
});
