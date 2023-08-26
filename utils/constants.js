const { NODE_ENV, SECRET_KEY } = process.env;

const SECRET_KEY_DEV = 'dev-secret-key';

// const REGEX = /https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}([a-zA-Z0-9-._~:?#[\]@!$&'()*+,;=]*)/;

// module.exports = {
//   REGEX, NODE_ENV, SECRET_KEY, SECRET_KEY_DEV,
// };
module.exports = {
  NODE_ENV, SECRET_KEY, SECRET_KEY_DEV,
};

const VALIDATION = 400;
const UNAUTHORISED = 401; // передан неверный логин или пароль.
// Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT;
const FORBIDDEN = 403; // например, при попытке удалить чужую карточку
const NOT_FOUND = 404;
const CONFLICT = 409; // user exists -
// при регистрации указан email, который уже существует на сервере
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
  VALIDATION,
  UNAUTHORISED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};
