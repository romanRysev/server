/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const KEY = require(path.resolve('config.js'));
const User = require(path.resolve('models/user.js'));

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) { throw new Error('Source not found'); }
      return user;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Source not found') {
        res.status(404).send({ message: 'Ресурс не найден!' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (password.length < 8) {
    return res.status(500).send({ message: 'Пароль слишком короткий!' });
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, KEY.KEY, { expiresIn: '7d' });
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
            .end();
        });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
