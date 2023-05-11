   const Product = require('../model/Product')
   const User    = require('../model/user')
   const Cart    = require('../model/Cart')

      // Index action
  exports.getIndexRoute = function(req,res){ 
    
    Product.find().then((result) => {
        res.render('shop/index',{products: result,isAuthenticate:req.session.isAuthenticate, name: req.session.user.name}) 
        }).catch((err) => {
             console.log(err)
        });  
     
   }

     // /shop action
   exports.getShopRoute =  function(req,res,next){  
      
       typeof req.session.user != 'undefined'
       ?
        Product.find().then((result) => {
            res.render('shop/shop',{products: result,
                isAuthenticate: req.session.isAuthenticate,
                name:  req.session.user.name}) 
        }).catch((err) => {
            console.log(err)
        }) :
        Product.find().then((result) => {
            res.render('shop/shop',{products: result,
                isAuthenticate: req.session.isAuthenticate}) 
        }).catch((err) => {
            console.log(err)
        })
    }

      // /product action
    exports.getProductsRouter = function(req,res){ 

        typeof req.session.user != 'undefined'
        ?
        Product.find().then((result) => {
              res.render('shop/product-list',{products: result,
                isAuthenticate: req.session.isAuthenticate,
                name:  req.session.user.name
               })
        }).catch((err) => {
             console.log(err)
        })  : 
        Product.find().then((result) => {
            res.render('shop/product-list',{products: result,
              isAuthenticate: req.session.isAuthenticate
             })
      }).catch((err) => {
           console.log(err)
      })  
    }


    exports.getDetailRoute = function(req,res)
    {
        const ProdId = req.params.productId
        typeof req.session.user != 'undefined'
        ?
            Product.findById(ProdId).then((result) => {
                res.render('shop/product-detail', {
                    product: result,
                    isAuthenticate: req.session.isAuthenticate,
                    name: req.session.user.name
                })
            }).catch((err) => {
                console.log(err)
            }) 
        :
        Product.findById(ProdId).then((result) => {
            res.render('shop/product-detail', {
                product: result,
                isAuthenticate: req.session.isAuthenticate   
            })
        }).catch((err) => {
            console.log(err)
        })

            
    }


    // Add to cart action
    exports.addcartRoute = function(req,res){
      const productid = req.params.productid
      const useremail = req.session.user.email
      
       Cart.findOne({productid : productid , useremail : useremail})
       .then(result => {
             if(!result){
                const cart = new Cart({
                      productid : productid,
                      useremail : useremail,
                      quantity  : 1
                })
               cart.save();
               res.redirect('/shop')
             }
             else{
                 result.quantity += 1;
                 result.save();
                 res.redirect('/shop')
             }
       })
       .catch(err => {
           console.log(err)
       })
    }
 
    // cart action
    exports.getcartRoute = function(req,res){
       
    //    TODO: Remaining to write this logic
    }



     // Error action
     exports.getErrorRoute = function(req,res,next)
     { 
     res.status(404).render('404')
     } 


