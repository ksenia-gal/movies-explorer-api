const jwt = require('jsonwebtoken');
const { NODE_ENV, SECRET_KEY_DEV, SECRET_KEY } = require('../utils/constants');
// const { JWT_SECRET } = require('../config');
const AuthorizationError = require('../errors/unauthorisedError');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AuthorizationError('Токен остутствует или некорректен'));
  }
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV);
    // payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось.
    next(new AuthorizationError('Токен не верифицирован, необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};

module.exports = auth;
