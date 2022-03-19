const express = require('express')
const { authUser, loginUser } = require('../controllers/auth')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.route('/').get(protect, authUser).post(loginUser)

module.exports = router
