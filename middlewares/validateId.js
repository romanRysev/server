const { celebrate, Joi } = require('celebrate');

const validateId = celebrate({
  params: Joi.object().keys({
    Id: Joi.string().alphanum().length(24),
  }),
});

module.exports = validateId;
