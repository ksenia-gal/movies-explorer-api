const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { validateSignup, validateSignin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');

// роуты, не требующие авторизации
// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', validateSignup, createUser);
// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', validateSignin, login);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
