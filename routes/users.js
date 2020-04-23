const router = require('express').Router();
const users = require('../data/users.json');

router.get('/', (req, res) => {
  res.send(users);
});

function getUserMiddleware(req, res, next) {
  const user = users.find((u) => u._id === req.params.id);
  if (!user) {
    return res.status(404).send({ message: 'user not found' });
  }
  req.user = user;
  next();
}


router.get('/:id', getUserMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;
