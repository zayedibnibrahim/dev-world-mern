const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/users')

exports.protect = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = req.user = await User.findById(decoded.id).select('-password')

    next()
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
