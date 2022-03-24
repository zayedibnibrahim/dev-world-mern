const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/users')

exports.protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_TOKEN)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401).json({ error: { msg: 'Token is not valid' } })
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ error: { msg: 'No token, authorization denied' } })
  }
}
