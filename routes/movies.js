const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(), // ?
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Неверный URL')}),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Неверный URL')}),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) return value;
      return helpers.message('Неверный URL')}),
    movieId: Joi.number().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;