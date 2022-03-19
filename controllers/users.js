const express = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/users')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

// @route      POST api/users
// @desc       Register User
// @access     Public
exports.registerUser = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  } else {
    const { name, email, password } = req.body

    try {
      const userExist = await User.findOne({ email })
      if (userExist) {
        res.status(400).json({ error: [{ msg: 'User Already exist' }] })
      } else {
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        })

        const user = new User({
          name,
          email,
          avatar,
          password,
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        if (user) {
          res.json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          })
        }
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server Error')
    }
  }
}
