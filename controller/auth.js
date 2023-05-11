const bcrypt     = require('bcryptjs')
const User       =  require('../model/user')
const nodemailer = require('nodemailer')
const crypto     = require('crypto')

exports.getLoginRoute = function(req,res){
    res.render('auth/login')
}

exports.getRegisterRoute = function(req,res){
    res.render('auth/register')
}


exports.postRegisterRoute = (req,res)=>{
   var name      = req.body.name
   var email     = req.body.email
   var password  = req.body.password
   var password2 = req.body.password2      

          if(!name || !email || !password || !password2)
          {
              req.flash('error_msg', 'Please fill all the fields')
              res.redirect('/register')
          }
          if(password !=  password2)
          {
            req.flash('error_msg', 'Passwords do not Match')
            res.redirect('/register')
          }
          if(password.length < 6)
           {
            req.flash('error_msg', 'Password Must atleast 6 characters')
            res.redirect('/register')
           }

          User.findOne({email: email})
          .then(user =>{
              if(user){
                req.flash('error_msg', 'That Email is already register')
                 res.redirect('/register')
              }
              else{
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                  var newuser = new User({
                      name: name,
                      email: email,
                      password: hash
                  })
                  newuser.save()
                  req.flash('success_msg', 'You have successfully Registered')
                 res.redirect('/login')
              }
          })
          .catch(err => {console.log(err)})
}  


exports.postLoginRoute = function(req,res){
   var email    = req.body.email
   var password = req.body.password
   var loginError;
       if(!email || !password)
       {
           loginError = 'Please provide Email and Password'
           res.render('auth/login',{
            loginerror: loginError 
           })
       }  
   User.findOne({email: email})
   .then(user => {
       if(!user)
       {
           loginError = 'Please provide Correct Email'
           res.render('auth/login',{
               loginerror: loginError
           })
       }
       else
       {
           
         bcrypt.compare(password,user.password, function(err,isMatch){              
        if(err)
        {
                throw err;
        }     
        if(isMatch)
        {
            req.session.user = user
            req.session.isAuthenticate = true;
            res.redirect('/')     
        }
        else{
         loginError = 'Password is Invalid'
        res.render('auth/login',{
            loginerror: loginError
                })
        }
           })
       }    
   })
   .catch(err => console.log(err))
}


exports.getLogoutRoute = function(req,res)
{
    req.session.destroy();
    res.redirect('/login')
}



exports.getResetRoute = function(req,res,next){
    res.render('auth/reset', {
        isAuthenticate: req.session.isAuthenticate,
    })
}


exports.postResetRoute = function(req,res,next)
{
    var email = req.body.email

        if(!email)
        {
            req.flash('error_msg', 'Please Provide Email')
            res.redirect('/reset')
        }


        User.findOne({email: email})
        .then(user => {
            if(!user)
            {   
              req.flash('error_msg', 'Wrong Email')  
              res.redirect('/reset')
            }
            else{
                 crypto.randomBytes(10,(err,buffer)=>{
                       if(err)
                       {
                           res.redirect('/reset')
                           console.log(err)
                       }

                      var token = buffer.toString('hex')
                      user.resetToken = token
                      user.save();

                      var transporter = nodemailer.createTransport({
                          service: 'gmail',
                          auth: {
                              user: 'contact.webtech95@gmail.com',
                              pass: 8950094098
                          }
                      })

                      var mailoption = {
                          from : 'Shopping site <contact.webtech95@gmail.com>',
                          to : 'prince.sumit95@gmail.com',
                          subject : 'change Your password',
                          html: `
                          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to change your password</p>
                        ` 
                      }
   
                       transporter.sendMail(mailoption, (err, info)=>{
                           if(err){
                               console.log(err)
                           }
                           else{
                               console.log(info)
                            req.flash('error_msg', 'We sent You a mail to change the password')
                            res.redirect('/login')
                           }
                       })
                    
                 })       
            }      
        })
        .catch(err => console.log(err))
}
exports.getResetPassRoute = function(req,res,next){
     var token= req.params.token
      User.findOne({resetToken: token})
      .then(user => {
          if(!user)
          {
              res.redirect('/login')
          }
          else{
              res.render("auth/resetpassform", {
                  token : token,
              })
          }

      })
      .catch(err => console.log(err))
}
exports.postChangePass = function(req,res,next){
   var token = req.body.gettoken
   var newpassword = req.body.password
      
   
        User.findOne({resetToken: token})
        .then(user => {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(newpassword, salt);
             user.password = hash
             user.resetToken= null
             user.save()
             req.flash('error_msg', 'Your password has changed')
             res.redirect('/login')
        })
        .catch(err => console.log(err))
}