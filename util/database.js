const MongoDb = require('mongodb')

const MongoClient = MongoDb.MongoClient;
var db;  

const mongoConnect = function(){ 
    MongoClient.connect('mongodb+srv://sumit:thisissumitpassword@cluster0-x042n.mongodb.net/shoppingsite?retryWrites=true')
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