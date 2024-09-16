const express           = require('express')
const bodyParser        = require('body-parser')
const path              = require('path')
const session           = require('express-session')
const SessionStore      = require('connect-mongodb-session')(session)
const flash             = require('connect-flash')
const mongoose          = require('mongoose')
require('dotenv').config();


     // Accessing the Route files
      const ShopRoute         = require('./routes/shop')
      const AdminRoute        = require('./routes/admin')
      const authRoute         = require('./routes/auth')
      const AccountRoute      = require('./routes/userAccount')
      const errorController   = require('./controller/shop').getErrorRoute
 

      
         
      //init express
      const app    = express();


     const Store   = new SessionStore({
           uri: process.env.MONGOURI,
           collection : 'session'
     })

     // set up the middleware
     app.set('view engine', 'ejs')  
     app.set('views','views')
     app.use(bodyParser.urlencoded({extended: true})) 
     app.use(express.static(path.join(__dirname,'public')))

     app.use(session({
           secret: 'mysecret',
           resave: true,
           saveUninitialized: false,
           store : Store
     }))
      
     app.use(flash())
     app.use((req,res,next)=>{
        res.locals.error_msg = req.flash('error_msg')
        res.locals.success_msg = req.flash('success_msg')
        res.locals.edit_msg = req.flash('edit_msg')
        res.locals.delete_msg = req.flash('delete_msg')
        res.locals.add_msg = req.flash('add_msg')
        res.locals.email_change_msg = req.flash('email_change_msg')
        next()
     })

        // Routes Middleware
        app.use(ShopRoute)
        app.use('/admin',AdminRoute)   
        app.use(authRoute)
        app.use('/account',AccountRoute)
        app.use(errorController)


        
      mongoose.connect(process.env.MONGOURI, {dbName : "shop"})
      .then((result) => {
            console.log("Database connection successful")
            app.listen(3000)
          })
      .catch((err) => {     
            console.log(err)
       });
    