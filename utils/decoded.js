const jwt = require('jsonwebtoken')
require('dotenv').config()

const decoded = (req) => {
  const token = req.headers.authorization.split(' ').at(1)
  req.user = jwt.verify(token, process.env.secretKey)
  return req.user.id
}
module.exports = ({
  decoded
})