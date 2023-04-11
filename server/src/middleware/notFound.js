const NotFoundMiddleware = (req, res) => {
  res.status(404).send('Route does not Exist')
}

module.exports = NotFoundMiddleware
