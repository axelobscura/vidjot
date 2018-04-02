const express = require('express');
const path = require('path');
const routerExpress = require('router-express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const ideas = require('./routes/ideas');
const users = require('./routes/users');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://vidjot:v3dj4t@ds155288.mlab.com:55288/vidjotmex')
    .then(() => {
        console.log('Mongo Connected')
    })
    .catch(err => {
        console.log(err)
    });

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

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

app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;

app.listen(port, () => {
    console.log(`El puerto de entrada es ${port}`);
});