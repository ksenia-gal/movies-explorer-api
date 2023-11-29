const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const { NODE_ENV, SECRET_KEY_DEV, SECRET_KEY } = require('../utils/constants');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(NODE_ENV, SECRET_KEY, SECRET_KEY_DEV);
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
        // JWT_SECRET,
        { expiresIn: '7d' },
      );
        // вернем токен
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ token });
    })
    .catch(next);
};

// получение текущего пользователя
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Передан некорректный id пользователя'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

// создание пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!password || password.length < 4) {
    throw new ValidationError('Пароль отсутствует или короче 4 символов');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then((user) => res.send(user.toJSON()))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

// редактирование данных пользователя
const changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при редактировании данных пользователя');
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const logout = (req, res) => {
  res.clearCookie('token').send({ message: 'Выход выполнен' });
};

module.exports = {
  login,
  getCurrentUser,
  createUser,
  changeUserInfo,
  logout,
};
