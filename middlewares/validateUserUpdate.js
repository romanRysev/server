const { celebrate, Joi } = require('celebrate');

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required(),
  }),
});


module.exports = validateUserUpdate;
