const { celebrate, Joi } = require('celebrate');

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});


module.exports = validateAvatar;
