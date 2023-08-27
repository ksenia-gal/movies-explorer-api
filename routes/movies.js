const router = require('express').Router();

const { validateMovieCreation, validateMovie } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле данными
router.post('/', validateMovieCreation, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validateMovie, deleteMovie);

module.exports = router;
