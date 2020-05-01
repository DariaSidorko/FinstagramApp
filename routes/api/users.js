const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const Validator = require('validator');
const router = express.Router();

// Profile model
const Profile = require('../../models/Profile');
// IsEmpty validator
const isEmpty = require('../../validation/is-empty');
// isEmail validator
//const isEmail = require('../../validation/register');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route POST api/posts/register
//@desc Register user
// access Public

router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }

  const Errors = {};
  User.findOne({email: req.body.email})
  .then(user => {
    // checking if email is already being used
    if(user){
      Errors.email = 'Email already exists';
    } 

    const profileFields = {};
    profileFields.handle = req.body.handle;

    // checking if handle is already being used
    Profile.findOne({ handle: profileFields.handle })
      .then(profile => {
        if(profile){
          Errors.handle = "Username already exists";
        }
       
    if (!isEmpty(Errors)){
      return res.status(400).json(Errors)
    }
    else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'retro'
      })
      const newUser = new User({
        name: req.body.name,
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save()
          .then(user => {
            profileFields.user = user._id;
            profileFields.handle = req.body.handle;
            new Profile(profileFields).save().then(profile => res.json(profile));
            res.json(user)
          })
          .catch(err => console.log(err))
          
        })
      })
      } 
    }) 
  })  
  .catch(err => console.log(err))
})


//@route POST api/users/login
//@desc Login user
// access Public

router.post('/login', (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }

 const login = {};
 //console.log(Validator.isEmail(req.body.email))
  if (Validator.isEmail(req.body.email)) {
    //login = req.body.email
    
    User.findOne({email: req.body.email})
    .then(user => {
      if (!user){
        return res.status(404).json({email: 'User not found!'});
      }

      else {
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch){
              //User matched
              //payload
              const payload = {
                id: user.id, 
                name: user.name, 
                avatar: user.avatar,
                handle: user.handle
              };

                //sign token
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 10800}, (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                })
          } else {
            return res.status(404).json({password: 'Password is incorrect'})
          }
        })
      }
    })
  .catch(err => console.log(err));
}

/*  ******* NEW PART -- LOGIN VIA HANDLE OR EMAIL *******  */
else {

  User.findOne({handle: req.body.email})
  
  .then(user => {
    if (!user){
      return res.status(404).json({email: 'User not found!'});
    }

    else {
      bcrypt.compare(req.body.password, user.password)
        .then(isMatch => {
          if (isMatch){
            //User matched
            //payload
            const payload = {
              id: user.id, 
              name: user.name, 
              avatar: user.avatar,
              handle: user.handle
            };

              //sign token
              jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              })
        } else {
          return res.status(404).json({password: 'Password is incorrect'})
        }
      })
    }
  })
.catch(err => console.log(err));

}
}

) 
/*  ******* END NEW PART -- LOGIN VIA HANDLE OR EMAIL *******  */  


//@route POST api/users/
//@desc Reset Password
// access Public

router.post('/passreset',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body) //need to change validation
  if(!isValid){
    return res.status(400).json(errors);
  }
   
    User.findOne({id: req.user.id})
    .then(user => {

        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch){
              const newPassword = {
                password: req.body.password,
              };
        
              bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newPassword.password, salt, (err, hash) => {
                  newPassword.password = hash;
                  User.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                  //newPassword.save()
                  )
                  .then(user => res.json(user));
                  })
                  .catch(err => console.log(err))
                  
                })
              }
            else {
              return res.status(404).json({password: 'Password is incorrect'})
            }
        })
    })
  .catch(err => console.log(err));
  })

//@route GET api/posts/current
//@desc Return current user info
// access Private

router.get(
  '/current', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
})




module.exports = router;
