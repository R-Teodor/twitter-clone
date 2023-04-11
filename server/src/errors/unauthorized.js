const CustomAPIError = require('./customError')

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}

module.exports = Unauthorized
