const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.post('/ideas', (req, res) => {
    //res.render('ideas/add');
    //console.log(req.body);
    //res.send('ok');

    let errors = [];

    if (!req.body.title) {
        errors.push({ text: 'Please add title' });
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add some details' });
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
    }
});

const port = 5000;

app.listen(port, () => {
    console.log(`El puerto de entrada es ${port}`);
});