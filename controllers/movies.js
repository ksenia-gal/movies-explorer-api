const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');

// добавление всех сохраненных фильмов на страницу
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// создание нового фильма
const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Произошла ошибка при создании нового фильма, переданы некорректные данные');
      }
    })
    .catch(next);
};

// удаление фильма по id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Movie.deleteOne({ _id: movie._id });
    })
    .then(() => res.send({ message: 'Фильм успешно удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Произошла ошибка при удалении фильма, переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};