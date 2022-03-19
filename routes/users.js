const express = require('express')
const { registerUser } = require('../controllers/users')
const { validateUser } = require('../validations/user')

const router = express.Router()

router.route('/').post(validateUser, registerUser)

module.exports = router
