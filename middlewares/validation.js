const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) return value;
        return helpers.message('Неверный формат email');
      }),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) return value;
        return helpers.message('Неверный формат email');
      }),
    password: Joi.string().required().min(4),
  }),
});

const validateChangeUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) return value;
        return helpers.message('Неверный формат email');
      }),
  }),
});

const validateMovieCreation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) return value;
        return helpers.message('Неверный формат ссылки');
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) return value;
        return helpers.message('Неверный формат ссылки');
      }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) return value;
        return helpers.message('Неверный формат ссылки');
      }),
    movieId: Joi.number().required(),
  }),
});

const validateMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) return value;
        return helpers.message('Неверный id');
      }),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateChangeUserData,
  validateMovieCreation,
  validateMovie,
};
