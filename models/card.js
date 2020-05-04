/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const userSchema = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    match: /(h|H)tt(p|ps):\/\/(www\.)?(?!(www\.))(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[a-zA-Z0-9\.-]+\.[a-zA-Z]+)(:([1-9][0-9]{1,3}))?(\/[a-zA-Z0-9-\/\.]*#?)?/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    user: userSchema,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    default: Date.now,
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
