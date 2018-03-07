const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

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

app.get('/ideas', (req, res) => {
    Idea.find({})
        .sort({date:'desc'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas:ideas
            });
        });
});

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea =>{
        res.render('ideas/edit', {
            idea:idea
        });
    })
    
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

app.put('/ideas/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea =>{
        idea.title = req.body.title;
        idea.details = req.body.details;

        idea.save()
            .then(idea => {
                res.redirect('/ideas');
            })
    })
});

app.delete('/ideas/:id', (req, res) => {
   Idea.remove({_id: req.params.id})
    .then(() => {
        res.redirect('/ideas');
    })
});

const port = 5000;

app.listen(port, () => {
    console.log(`El puerto de entrada es ${port}`);
});