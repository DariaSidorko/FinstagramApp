const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
// Load Validation
const validateProfileInput = require("../../validation/profile");



// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["handle", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get("/all", (req, res) => {
    const errors ={};
    Profile.find()
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        if(!profiles){
          errors.noprofile = "No profiles available";
          return res.status(400).json(errors);
        } else {
          res.json(profiles)
        }
      })
      .catch(err => {res.status(404).json("There are no profiles")});
  });


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({handle: req.param.handle})
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if(!profile){
        errors.noprofile = "There is no profile with this user name";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});



// @route   POST api/profile
// @desc    Edit user profile
// @access  Private

router.post(
  "/", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if(!isValid){
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    
    
    Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile){
        //Update
        Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        )
      }/*  else {
        //Create
        Profile.findOne({handle: profileFields.handle})
        .then(profile => {
          if(profile){
            errors.handle = "That user name is already taken";
            return res.status(400).json(errors)
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
        ) 
      } */
    }) 
  });


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);


module.exports = router;