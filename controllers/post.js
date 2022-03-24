const { validationResult } = require('express-validator')
const Profile = require('../models/profile')
const User = require('../models/users')
const Post = require('../models/post')

// @route      POST api/post
// @desc       Create post by user
// @access     Protected
exports.createPost = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  } else {
    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = new Post({
        text: req.body.text,
        posttext: req.body.posttext,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      })

      await post.save()

      res.json(post)
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: { msg: 'Server Error' } })
    }
  }
}

// @route      GET api/post
// @desc       Get all posts
// @access     Protected
exports.allPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      GET api/post/:id
// @desc       Get post by id
// @access     Protected
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' })
    }
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      DELETE api/post/:id
// @desc       Delete post by id
// @access     Protected
exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    } else {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' })
      } else {
        await post.remove()
        res.json({ msg: 'Post Deleted' })
      }
    }
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' })
    }
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      PUT api/post/like/:id
// @desc       Like a post
// @access     Protected
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    } else {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: 'Post already Liked' })
      } else {
        post.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post.likes)
      }
    }
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' })
    }
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      PUT api/post/unlike/:id
// @desc       Unlike a post
// @access     Protected
exports.unLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    } else {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: 'Post Has not Liked' })
      } else {
        const removeIndex = post.likes.map((like) =>
          like.user.toString().indexOf(req.user.id)
        )
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json({ msg: 'Post Unlike' })
      }
    }
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' })
    }
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      POST api/post/comment/:id
// @desc       Comment a post
// @access     Protected
exports.commentPost = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  } else {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' })
      } else {
        const user = await User.findById(req.user.id)
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
        }
        post.comments.unshift(newComment)
        await post.save()

        res.json(post.comments)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: { msg: 'Server Error' } })
    }
  }
}

// @route      DELETE api/post/comment/:id/:comment_id
// @desc       Delete Comment
// @access     Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const comment = post.comments.find(
      (item) => item.id === req.params.comment_id
    )

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' })
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorize' })
    }

    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    )

    post.comments.splice(removeIndex, 1)

    await post.save()

    res.json({ msg: 'Comment Deleted' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}
