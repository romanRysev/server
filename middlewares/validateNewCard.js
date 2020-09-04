const { celebrate, Joi } = require('celebrate');

const validateNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }),
});


module.exports = validateNewCard;
