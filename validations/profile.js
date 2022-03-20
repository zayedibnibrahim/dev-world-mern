const { check } = require('express-validator')

exports.validateProfile = [
  check('status', 'Status Is Required').not().isEmpty(),
  check('skills', 'Skills Is Required').not().isEmpty(),
]

exports.validateExperience = [
  check('title', 'title Is Required').not().isEmpty(),
  check('company', 'company Is Required').not().isEmpty(),
  check('location', 'location Is Required').not().isEmpty(),
  check('from', 'form Is Required').not().isEmpty(),
  check('description', 'description Is Required').not().isEmpty(),
]

exports.validateEducation = [
  check('school', 'school Is Required').not().isEmpty(),
  check('degree', 'degree Is Required').not().isEmpty(),
  check('fieldofstudy', 'fieldofstudy Is Required').not().isEmpty(),
  check('from', 'form Is Required').not().isEmpty(),
  check('description', 'description Is Required').not().isEmpty(),
]
