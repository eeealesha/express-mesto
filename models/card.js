const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  "likes": [{
    "name": {
      type: String
    },
    "about": {
      type: String
    },
    "avatar": {
      type: String
    }
  }],
  "_id": {
    type: String
  },
  "name": {
    type: String
  },
  "link": {
    type: String
  },
  "owner": [{
    "name": {
      type: String
    },
    "about": {
      type: String
    },
    "avatar": {
      type: String
    }
  }],
  "createdAt": {
    type: String
  }
})