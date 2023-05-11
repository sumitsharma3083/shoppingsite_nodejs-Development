 const Product   = require('../model/Product')
 const User      = require('../model/user')
 const multer    = require('multer')
 const path      = require('path')


    //      SET STORAGE ENGINE
    const storage = multer.diskStorage({
       destination : './public/images/',
       filename : ( req,file,cb)=>{
       cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
       }
       })


 // Init Uploads
    const upload = multer({
       storage : storage
     }).single('myimage')


exports.getAddProductRoute = (req,res)=>{
       res.render('admin/add-product', {
              isAuthenticate:req.session.isAuthenticate,
              name: req.session.user.name
       })
   }

  
 
 exports.PostAddProductRoute =  function(req,res){
       
      upload(req,res , (err) => {
          if(err){
              res.render('admin/add-product',{
                       isAuthenticate:req.session.isAuthenticate,
                       name: req.session.user.name
               })
          }else{
              const title       = req.body.title
              const price       = req.body.price
              const description = req.body.description
              const imgname     = req.file.filename

               if(!title || !price || !description || !imgname)
               {
                 res.render('admin/add-product',{
                           isAuthenticate:req.session.isAuthenticate,
                             error: 'Please Fill all the fields',
                             name: req.session.user.name
                      })
               }
               else{
      
                    const product = new Product({
                           title: title,
                           price: price,
                           description: description,
                           imgname: imgname,
                           userId: req.session.user
                     })
           
         product.save().then((result) => {
         req.flash('add_msg', 'Product Add Successfully')
                  res.redirect('/')
                    }).catch((err) => {
                           console.log(err); 
                    }); 
               }    
          }
         })


        
}
 
exports.getEditProductRoute = function(req,res){
   
       Product.find().then((result) => {
              res.render('admin/edit-product',{products: result,
                     isAuthenticate: req.session.isAuthenticate,
                     name: req.session.user.name})
       }).catch((err) => {
              console.log(err);     
       });
    
}

exports.getEditingRoute = function(req,res){
                const id = req.params.prodId
      Product.findById(id).then((result) => {
              res.render('admin/editing',{Product: result,isAuthenticate: req.session.isAuthenticate})
      }).catch((err) => {
             console.log(err)
      });
     }


 exports.editdone = function(req,res){  
        upload(req,res, (err) => {
               if(err){
                      console.log(err)
               }
               else{
                     const id             = req.body.getId
                     const newtitle       = req.body.title
                     const newprice       = req.body.price
                     const newdescription = req.body.description
                     const newimage       = req.file.filename

                       Product.findById(id).then((result) => {
                                    result.title       = newtitle
                                    result.price       = newprice
                                    result.description = newdescription
                                    result.imgname     = newimage
                                    return result.save()          
                               }).then(result=>{
                                      req.flash('edit_msg' ,'Product is successfully edit') 
                                      res.redirect('/')
                               }).catch((err) => {
                                      console.log(err)
                               });
               }
        })
      
       }




      exports.deleteProduct = function(req,res){
           const id = req.body.id

            Product.deleteOne({_id: id}).then((result) => { 
                    req.flash('delete_msg', 'Product Delete successfully')
                    res.redirect('/')
            }).catch((err) => {
                     console.log(err)
            });

   
                User.findOne({email: req.session.user.email})
                .then(user =>{
                     var allproducts = user.cart

         var getindex = allproducts.findIndex(product =>{

                 return product.id.toString() == id.toString()        
         })    
               allproducts.splice(getindex,1)
                   user.cart = allproducts 
                   user.save()
                })
                .catch(err => console.log(err))

            
               
          }



        