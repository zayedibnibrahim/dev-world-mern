const { check } = require('express-validator')

exports.validateProfile = [
  check('status', 'Status Is Required').not().isEmpty(),
  check('skills', 'Skills Is Required').not().isEmpty(),
]
