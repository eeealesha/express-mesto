const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "name": {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true
    },
    "about": {
      type: String
    },
    "avatar": {
      type: String
    }
  }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;