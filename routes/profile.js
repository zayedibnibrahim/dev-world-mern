const express = require('express')
const {
  currentUserProfile,
  createProfile,
  usersProfile,
  userProfileById,
  userProfileDelete,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  userGitRepos,
} = require('../controllers/profile')
const { protect } = require('../middleware/auth')
const {
  validateProfile,
  validateExperience,
  validateEducation,
} = require('../validations/profile')
const router = express.Router()

router
  .route('/')
  .post(validateProfile, protect, createProfile)
  .get(usersProfile)
router.route('/me').get(protect, currentUserProfile)
router.route('/user/:user_id').get(userProfileById)
router.route('/').delete(protect, userProfileDelete)

router.route('/experience').put(validateExperience, protect, addExperience)
router.route('/experience/:exp_id').delete(protect, deleteExperience)

router.route('/education').put(validateEducation, protect, addEducation)
router.route('/education/:edu_id').delete(protect, deleteEducation)

router.route('/github/:username').get(userGitRepos)

module.exports = router
