const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

// Profile model
const Profile = require('../../models/Profile');
//IsEmpty validator
const isEmpty = require('../../validation/is-empty');

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

  const profileFields = {};
  if (req.body.handle) profileFields.handle = req.body.handle;

  const Errors = {};
  User.findOne({email: req.body.email})
  .then(user => {
    // checking if email is already being used
    if(user){
      Errors.email = 'Email already exsist!';
    } 
    // checking if handle is already being used
    Profile.findOne({ handle: profileFields.handle })
      .then(profile => {
        if(profile){
          Errors.handle = "That user name is already taken";
        }
       
    if (!isEmpty(Errors)){
      return res.status(400).json(Errors)
    }
    else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        handle:req.body.handle,
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
            console.log(user._id);
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


//@route POST api/posts/login
//@desc Login user
// access Public

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user){
        return res.status(404).json({email: 'User not found!'});
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch){
              //User matched
              //payload
              const payload = {
                id: user.id, 
                name: user.name, 
                avatar: user.avatar};

                //dign token
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
