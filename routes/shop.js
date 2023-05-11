const express = require('express')
const Router = express.Router();
const shopController = require('../controller/shop') 
const islogged    = require('../util/islogged')

     // GET    /index route
     Router.get('/',islogged,shopController.getIndexRoute)


     // GET         /shop
     Router.get('/shop',shopController.getShopRoute)


     // GET          /products
     Router.get('/products',shopController.getProductsRouter)
     

     //  GET        /products/detail/ 
       Router.get('/products/detail/:productId',shopController.getDetailRoute)

    
    
       Router.get('/add-to-cart/:productid', shopController.addcartRoute)


       Router.get('/cart', shopController.getcartRoute)
       

     module.exports = Router