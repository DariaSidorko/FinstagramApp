const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: "No posts found"}));
})


// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});


// @route   GET api/posts/bookmark
// @desc    Get bookmarks
// @access  Private
 router.get(
  '/bookmark',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.find()
    .then(post => {
      let result = [];
      if (post){
        for (let i=0; i< post.length; i++){
        post[i].bookmarks.filter(bookmark =>
          { 
            if(bookmark.user.toString() === req.user.id){
              result.push(post[i]);
            }
          })
      }
      return res.json(result);
      }
    
  })
    .catch(err => res.status(404).json({ postnotfound: 'No bookmarked posts found' }));
  }
); 


// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {

      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      image: req.body.image,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);


// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {

          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }
          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);


// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {

        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);





/*  ******* NEW BOOKMARKS PART *******  */

// @route   POST api/posts/bookmark/:id
// @desc    Add post to bookmarks
// @access  Private
 router.post(
  '/bookmark/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      if (
        post.bookmarks.filter(bookmark => bookmark.user.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadybookmarked: 'User already bookmarked this post' });
      }

      // Add user id to likes array
      post.bookmarks.unshift({ user: req.user.id });
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
); 


// @route   POST api/posts/unbookmark/:id
// @desc    Remove post from bookmarks
// @access  Private
 router.post(
  '/unbookmark/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.bookmarks.filter(bookmark => bookmark.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notbookmarked: 'You have not yet bookmarked this post' });
          }

          // Get remove index
          const removeIndex = post.bookmarks
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.bookmarks.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
); 

/*  ******* NEW BOOKMARKS PART  - END *******  */


/*  ******* NEW FOLLOWING PART *******  */

// @route   GET api/post/all
// @desc    Get all posts (users + all the profiles user is following)
// @access  Private
router.get (
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({user: req.user.id})
      .then(profile => {
        let users = [];
        for (let i=0; i < profile.following.length; i++){
          users[i] = profile.following[i].user;
        }
        users.push(req.user.id);
        Post.find({ user: { $in: users } })
        .then(post => res.json(post))
        .catch(err =>
          res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
      })
      .catch()
  });
  

/*  ******* NEW FOLLOWING PART  - END *******  */

/* 
db.bios.find(
  { _id: { $in: [ 5, ObjectId("507c35dd8fada716c89d0013") ] } }
) 
*/


module.exports = router;