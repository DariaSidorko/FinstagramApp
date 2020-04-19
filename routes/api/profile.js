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
    //if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    
    
    Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile){
        //Update
        console.log("update")
        console.log(profileFields)
        Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        ).then(profile => res.json(profile));
      }  else {
        //Create
        Profile.findOne({handle: profileFields.handle})
        .then(profile => {
          console.log("test")
          if(profile){
            errors.handle = "That user name is already taken";
            return res.status(400).json(errors)
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
        ) 
      } 
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



/*  ******* NEW FOLLOWING PART *******  */

// @route   POST api/profile/follow/:user_id
// @desc    Adds user'd ids into folllowong/followers arrays respectfully
// @access  Private
router.post(
  '/follow/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user)
    Profile.findOne({user: req.user.id})
    .then(profile => {
      if (profile.following.filter(follow => follow.user.toString() === req.params.user_id).length > 0) {
        return res.status(400).json({ alreadyfollowing: 'You are already following this profile' });
      } 
      // Adds user's id of the profile to follow, into "following" array of the current user.
      profile.following.unshift({ user: req.params.user_id });
      profile.save().then(profile => res.json(profile));

      Profile.findOne({user: req.params.user_id})
      .then(profile => {
        // Adds current user's id into the "followers" array of the profile, this current user start to follow.
        profile.followers.unshift({ user: req.user.id });
        profile.save().then(profile => res.json(profile));
      })
    })
    .catch(err => res.status(404).json({ profilenotfound: 'No profile found' }));
  }
); 


// @route   POST api/profile/unfollow/:user_id
// @desc    Remove user'd ids into folllowong/followers arrays respectfully
// @access  Private
 router.post(
  '/unfollow/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Profile.findOne({user: req.user.id})
        .then(profile => {
          if (
            profile.following.filter(follow => follow.user.toString() === req.params.user_id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notfollowing: 'You have not yet following this profile' });
          }

          // Get remove index
          const removeIndex = profile.following
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice out of array
          profile.following.splice(removeIndex, 1);
          // Save
          profile.save().then(profile => res.json(profile));


          Profile.findOne({user: req.params.user_id})
          .then(profile => {
            // Get remove index
            const removeIndex = profile.followers
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            // Splice out of array
            profile.followers.splice(removeIndex, 1);
            // Save
            profile.save().then(profile => res.json(profile));
          })

        })
        .catch(err => res.status(404).json({ profilenotfound: 'No post found' }));
  }
); 


// @route   GET api/profile/following/:user_id
// @desc    Get following profiles
// @access  Private

router.get(
  "/following",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile.following.length === 0) {
          errors.noprofile = "You don't follow any profiles";
          return res.status(404).json(errors);
        }
        res.json(profile.following);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/following/:user_id
// @desc    Get following profiles
// @access  Private

router.get(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile.followers.length === 0) {
          errors.noprofile = "You don't follow any profiles";
          return res.status(404).json(errors);
        }
        res.json(profile.followers);
      })
      .catch(err => res.status(404).json(err));
  }
);

/*  ******* NEW FOLLOWING PART  - END *******  */

module.exports = router;