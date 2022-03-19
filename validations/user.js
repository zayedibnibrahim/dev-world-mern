const { check } = require('express-validator')

exports.validateUser = [
  check('name', 'Name Is Required').not().isEmpty(),
  check('email', 'Please Include a valid email').isEmail(),
  check(
    'password',
    'Please ender a password with 6 or more character'
  ).isLength({ min: 6 }),
]
exports.validateLoginUser = [
  check('email', 'Please Include a valid email').isEmail(),
  check('password', 'Please is required').exists(),
]
