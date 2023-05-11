const express = require('express')
const Router = express.Router();
const adminController = require('../controller/admin');
const islogged  = require('../util/islogged')
/***
 *  islogged = function(req,res,next)
        {
        if(req.session.isAuthenticate)
        {
            next();
        }
        res.redirect('/login')
        } 
 */
 

   // GET         /admin/add-product
  Router.get('/add-product',islogged,adminController.getAddProductRoute)



  //  POST         /admin/add-product
  Router.post('/add-product',adminController.PostAddProductRoute)


  //  GET           /edit-products
  Router.get('/edit-products',islogged,adminController.getEditProductRoute)

  
   // GET            /admin/edit-products/edit
  Router.get('/edit-products/edit/:prodId',islogged,adminController.getEditingRoute)
  


    //  POST           /admin/edit-done
   Router.post('/edit-done', adminController.editdone)


     
     //POST           /admin/delete-product
     Router.post('/delete-product',adminController.deleteProduct)


     module.exports = Router