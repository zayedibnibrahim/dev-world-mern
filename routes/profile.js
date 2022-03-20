const express = require('express')
const {
  currentUserProfile,
  createProfile,
  usersProfile,
  userProfileById,
} = require('../controllers/profile')
const { protect } = require('../middleware/auth')
const { validateProfile } = require('../validations/profile')
const router = express.Router()

router
  .route('/')
  .post(validateProfile, protect, createProfile)
  .get(usersProfile)
router.route('/me').get(protect, currentUserProfile)
router.route('/user/:user_id').get(userProfileById)

module.exports = router
