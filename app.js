const express = require('express');
var exphbs  = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
    //console.log(Date.now());
    req.name = 'AxelLLL obscura';
    next();
});

app.get('/', (req, res) => {
    //res.send('INDEX');
    //console.log(req.name);
    res.render('home');
});

app.get('/about', (req, res) => {
    res.send('ABOUT ONE');
});

const port = 5000;

app.listen(port, () => {
    console.log(`El puerto de entrada es ${port}`);
});