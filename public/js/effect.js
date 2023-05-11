
var userBtn = document.querySelector('.user_btn')
var subList = document.querySelector('.suboption')
var menubar = document.querySelector('.hamburg_menu')
var submenu = document.querySelector('#sub_menu')


 if(userBtn){
userBtn.addEventListener('click', function(){
     var effect = subList.getAttribute('id')
      if(effect == 'show')
      {
        subList.setAttribute('id', 'hide')
      }
      else{
        subList.setAttribute('id', 'show')
      }
       
     })
 }

menubar.addEventListener('click', function(){

    if(submenu.getAttribute('value') == 'hide'){
      submenu.style.display = 'block'
      submenu.setAttribute('value','show')
    }else{
      submenu.style.display = 'none'
      submenu.setAttribute('value','hide')
    } 
})

/**
 *  Following code deals with the personalinfo.ejs 
 * 
 **/ 
var email_change_container  = document.querySelector('.email_change_form')
var crossBtn  = document.querySelector('#cross_btn')
var overlay = document.querySelector('.overlay')
var editEmailBtn = document.querySelector('#edit_email_btn')
var body  = document.querySelector('body')

    if(crossBtn){
      crossBtn.addEventListener('click', function(){
        email_change_container.style.display =  'none';
        overlay.style.display = 'none';
        body.style.overflow   =  'visible';
      })

      editEmailBtn.addEventListener('click', function(){
        email_change_container.style.display =  'block';
        overlay.style.display = 'block';
        overlay.style.opacity = 0.7;
        body.style.overflow  =  'hidden';
      })
    }
