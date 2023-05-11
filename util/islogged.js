
module.exports = (req,res,next)=>{
   if(req.session.isAuthenticate)
   {
       next()
   }
   else
   {
       
       res.redirect('/login')
   }
}