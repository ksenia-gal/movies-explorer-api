const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const validator = require('validator');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');

// роуты, не требующие авторизации
// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) return value;
        return helpers.message('Неверный формат почты');
      }),
    password: Joi.string().required().min(4),
  }),
}), createUser);
// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
