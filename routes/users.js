const router = require('express').Router();
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const users = require(path.resolve('data/users.json'));

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((u) => u._id === req.params.id);
  if (!user) {
    return res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  return res.send(user);
});

module.exports = router;
