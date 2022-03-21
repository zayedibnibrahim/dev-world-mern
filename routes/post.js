const express = require('express')
const router = express.Router()
const {
  createPost,
  allPosts,
  getPostById,
  deletePostById,
  likePost,
  unLikePost,
  commentPost,
  deleteComment,
} = require('../controllers/post')

const { protect } = require('../middleware/auth')
const { validatePost, validateComment } = require('../validations/post')

router.route('/').post(validatePost, protect, createPost).get(protect, allPosts)
router.route('/:id').get(protect, getPostById).delete(protect, deletePostById)

router.route('/like/:id').put(protect, likePost)
router.route('/unlike/:id').put(protect, unLikePost)

router.route('/comment/:id').put(validateComment, protect, commentPost)
router.route('/comment/:id/:comment_id').put(protect, deleteComment)

module.exports = router
