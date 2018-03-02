const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://vidjot:v3dj4t@ds155288.mlab.com:55288/vidjotmex')
    .then(() => {
        console.log('Mongo Connected')
    })
    .catch(err => {
        console.log(err)
    });

require('./models/Idea');
const Idea = mongoose.model('ideas');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
    //console.log(Date.now());
    req.name = 'AxelLLL obscura';
    next();
});

app.get('/', (req, res) => {
    //res.send('INDEX');
    //console.log(req.name);
    const title = 'Welcome';
    res.render('home', {
        title: title
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

const port = 5000;

app.listen(port, () => {
    console.log(`El puerto de entrada es ${port}`);
});