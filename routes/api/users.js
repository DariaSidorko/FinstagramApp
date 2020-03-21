const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

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

  User.findOne({email: req.body.email})
  .then(user => {
    if(user){
      return res.status(400).json({email:'Email already exsist!'})
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
        })
      } );
    }
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
