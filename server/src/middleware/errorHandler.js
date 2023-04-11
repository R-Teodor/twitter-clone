const ErrorHandler = (err, req, res, next) => {
  const errorObject = {
    msg: err.message || 'INTERNAL ERROR',
    statusCode: err.statusCode || 500,
  }
  res.status(errorObject.statusCode).json({ msg: errorObject.msg })
  // res.status(err.statusCode).json({ msg: err.message })
}

module.exports = ErrorHandler
