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
  }
});

//handle removed

module.exports = Profile = mongoose.model('profile', ProfileSchema);