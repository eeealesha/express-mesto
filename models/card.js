const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new mongoose.Schema({
  "likes": [{
    type: Schema.Types.ObjectId,
    default: []
  }],
  "name": {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  "link": {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g.test(v);
      },
      message: props => `${props.value} is not a valid url!`}
  },
  "owner": {
   type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  "createdAt": {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('card', cardSchema);