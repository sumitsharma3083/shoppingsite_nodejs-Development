const MongoDb = require('mongodb')
require('dotenv').config();


const MongoClient = MongoDb.MongoClient;
var db;  

const mongoConnect = function(){ 
    MongoClient.connect(process.env.MONGOURI)
    .then(result =>{
     console.log('connected')
      db = result.db()
    })
    .catch(err =>{
    console.log('Not connect')
    })

 } 
     const getdb = function(){
          if(db)
          {
              return db;
          }
          else
          {
              return  "No Database connected"
          } 

     }     

 module.exports = {
    mongoconnect : mongoConnect,
    db : getdb
 }