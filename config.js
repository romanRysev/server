/* eslint-disable radix */
require('dotenv').config();

module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/mestodb',
  PORT: parseInt(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
};
