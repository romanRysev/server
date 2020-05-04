/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: String,
  avatar: {
    type: String,
    required: true,
    match: /(h|H)tt(p|ps):\/\/(www\.)?(?!(www\.))(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[a-zA-Z0-9\.-]+\.[a-zA-Z]+)(:([1-9][0-9]{1,3}))?(\/[a-zA-Z0-9-\/\.]*#?)?/,
  },
});

module.exports = mongoose.model('user', userSchema);
