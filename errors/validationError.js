const { VALIDATION } = require('../utils/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION;
  }
}

module.exports = ValidationError;
