const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const env = require('./env.json');
const db = require('./db');
const users = require('./routes/users');
const offices = require('./routes/offices');

const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true })

app.use(morgan('dev'));
app.use(express.static(path.resolve(`${__dirname}/public`)))
app.use('/jquery', express.static(path.resolve(`${__dirname}/node_modules/jquery/dist/`)))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next)=> {
  res.render('index', { GOOGLE_API_KEY: env.GOOGLE_API_KEY });
})

app.use('/users', users);
app.use('/offices', offices);

app.use((err, req, res, next)=> {
  res.render('error');
})

const port = process.env.PORT || 3000;

db.sync()
  .then(()=> {
    return db.seed();
  })
  .then(()=> {
    app.listen(port, ()=> {
      console.log(`listening on port ${port}`);
    })
  })
