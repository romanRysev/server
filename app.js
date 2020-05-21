/* eslint-disable import/no-dynamic-require */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');

const router = require(path.resolve('./routes/routes.js'));
const { requestLogger, errorLogger } = require(path.resolve('./middlewares/logger'));
const NotFoundError = require(path.resolve('errors/NotFoundError.js'));
const error = require(path.resolve('./middlewares/errors.js'));

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use('/', router);
app.use('/', (req, res, next) => { next(new NotFoundError('Page not found!')); });
app.use(errorLogger);
app.use(error);

app.listen(PORT, () => {
});
