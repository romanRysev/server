/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const path = require('path');

const KEY = require(path.resolve('config.js'));
const UnauthorizedError = require(path.resolve('errors/UnauthorizedError.js'));

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, KEY.KEY);
  } catch (err) {
    const error = new UnauthorizedError('Unauthorized');
    next(error);
  }
  req.user = payload;
  next();
};
