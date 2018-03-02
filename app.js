const express = require('express');
const app = express();


app.use(function(req, res, next) {
    //console.log(Date.now());
    req.name = 'Axel obscura';
    next();
});

app.get('/', (req, res) => {
    res.send('INDEX');
    console.log(req.name);
});

app.get('/about', (req, res) => {
    res.send('ABOUT ONE');
});

const port = 5000;

app.listen(port, () => {
    console.log(`El puerto de entrada es ${port}`);
});