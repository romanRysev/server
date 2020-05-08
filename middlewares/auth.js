/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const path = require('path');

const KEY = require(path.resolve('config.js'));

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, KEY.KEY);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
