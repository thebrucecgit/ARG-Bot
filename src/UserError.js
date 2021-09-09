const DefaultErrorMessage = require("./DefaultErrorMessage");
class UserError extends DefaultErrorMessage {
  constructor(e) {
    super(e);
    this.setDescription(
      "Invalid command — something went wrong. See /help for list of valid commands."
    );
  }
}

module.exports = UserError;
