const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const  { toJson } =  require('unsplash-js')

global.fetch = fetch;

const app = express();
const result = dotenv.config();
const port = process.env.PORT ||  8080;

app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, '../public')));

const unsplash = new Unsplash({ accessKey: process.env.iGotTheKeysKeysKeys });
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$Treymysql74!',
  database: 'meme'
})

db.connect( (err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.post('/api', (req, res) => {
  console.log('hit /api');
  const {dataBase} = req.body;
  console.log('::::::::',dataBase);
  res.status(200).send({"message": 'image saved'})
  })

  app.post('/api/search', (req, res) => {
  const {userRequest} = req.body;  
  unsplash.search.photos(userRequest, 1, 10)
  .then(toJson)
  .then(json => {
    let res = []
    for(var item in json.results){
      res.push(json.results[item].urls.thumb)
    }
    myFunc(res)  
  })
  .catch((err)=>{
    console.error({'err:::': err.stack});
  })
  const myFunc = (payload)=>{
  res.status(200).send({payload})
  }
  })

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`); 
})