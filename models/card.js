const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
