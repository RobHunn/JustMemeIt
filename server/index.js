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
  password: 'xxxxx',
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
  const {data} = req.body;
  let dbQuery = 'INSERT INTO images (pic) VALUES (?);'
  db.query(dbQuery,[data], (err, rows, fields) => {
        if (err) {
          console.log('query error: ', err.stack)
          throw err;
        } else{
          myfunc()
        }
  })
  function myfunc(){
      res.status(200).send({'message':'good to go...'})
  }
  })

  app.get('/api/images', (req, res) => {
  console.log('HIT::::::::');
    db.query('SELECT * from images;',  (err, rows, fields) => {
      res.status(200).send(rows);
  })
  })

  app.post('/api/search', (req, res) => {
  let {userRequest} = req.body;  
  userRequest = userRequest.toLowerCase()
  unsplash.search.photos(userRequest, 1, 20)
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
  let dbQuery = 'INSERT INTO query_terms (term) VALUES (?);'
  let dbQuery2 = 'SELECT * FROM query_terms WHERE term = ?;'
  let dbQuery3 = `INSERT INTO term_url (term_id,urls) VALUES(LAST_INSERT_ID(),?);`
  let output = '';
  payload.forEach((e)=>{
    output += `${e},`
  })
  
  db.query(dbQuery2,[userRequest], (err, rows, fields) => {
      if(err){
        console.log('mysql  query error :', err);
      } 
      if(rows[0] ){
        res.status(200).send(payload)
      } else {
          db.query(dbQuery,[userRequest], (err, rows, fields) => {
            if(err){
               console.log('mysql  query error :', err);
            }else{
              db.query(dbQuery3,[output], (err, rows, fields) => {
                if(err){
                  console.log('mysql  query error :', err);
                }else{
                  res.status(200).send(payload)
                }
              })
            }
          })
      }
  })
  }
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`); 
})