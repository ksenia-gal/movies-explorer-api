const { UNAUTHORISED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORISED;
  }
}

module.exports = UnauthorizedError;
