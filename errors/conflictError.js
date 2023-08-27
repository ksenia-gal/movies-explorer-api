const { CONFLICT } = require('../utils/constants');

class UserExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = UserExistError;
