const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 30
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  //number of profiles this user is following
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      },
    }
  ],
  //number of users following this profile
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
      },
    }
  ]
});



module.exports = Profile = mongoose.model('profile', ProfileSchema);