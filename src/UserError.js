class UserError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = UserError;