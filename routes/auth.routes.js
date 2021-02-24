
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');


const User = require('../models/User.model')

////////////SIGN UP///////////

//sign up form
router.get('/auth/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
});


//post to save user in db
router.post('/signup', (req, res, next) => {
  const {username, email, userPassword} = req.body;
//all fields are required 
if(!username || !email || !userPassword){
  res.render('auth/signup.hbs', {
    errorMessage: 'All fileds are mandatory, please provide username, email and password'
  });
  return;
}

//hashed password
bcryptjs.genSalt(10)
.then(salt => bcryptjs.hash(userPassword, salt))
.then(hashedPassword => {
  return User.create({username, email, passwordHash: hashedPassword})
  .then(userFromDB => {
   // console.log(userFromDB)
   res.redirect('/profile')
  
  
  })
  
})
.catch(err => {
      //error code from mongo showing on terminal
      if(err.code === 11000){
        res.render('auth/signup.hbs', {errorMessage:'Username and email already exist!'});
      } else {

        console.log(`Error while creating user ${err}`)
      }
    });
})


//////////////LOG IN////////////

//sign up form
router.get('/auth/login', (req, res, next) => {
  res.render('auth/login.hbs')
});

router.post('/login', (req, res, next) => {
  const {email, userPassword} = req.body;

  //all fields are required 
if(!email || !userPassword){
  res.render('auth/login.hbs', {
    errorMessage: 'All fileds are mandatory, please provide email and password'
  });
  return;
}

  User.findOne({ email })
  .then(responseFromDB => {

    if(!responseFromDB){
      res.render('auth/login.hbs', { errorMessage: 'This email is not registered.'})
    } else if (bcryptjs.compareSync(userPassword, responseFromDB.passwordHash)){
     // console.log('logged in user is:', responseFromDB);

     req.session.currentUser = responseFromDB;
     //res.render('users/profile.hbs', {user: responseFromDB})
     res.redirect("/profile")
    } else {
      res.render ('auth/login.hbs', {errorMessage: 'Incorrect password.'});
    }
  })
  .catch(err => console.log('Error while user login:', err))

});


////user profile page

// router.get('/profile', (req, res, next)=>{
//   res.render('users/profile', {userInSession: req.session.currentUser})
// })


module.exports = router;