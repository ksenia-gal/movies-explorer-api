const jwt = require('jsonwebtoken');
const { NODE_ENV, SECRET_KEY_DEV, SECRET_KEY } = require('../utils/constants');
const AuthorizationError = require('../errors/unauthorisedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Токен остутствует или некорректен'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV);
  } catch (err) {
    // отправим ошибку, если не получилось.
    next(new AuthorizationError('Токен не верифицирован, необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};

module.exports = auth;
