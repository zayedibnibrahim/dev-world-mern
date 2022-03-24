const User = require('../models/users')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

// @route      GET api/auth
// @desc       Auth Users
// @access     Protected
exports.authUser = async (req, res) => {
  try {
    res.json(req.user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      POST api/users
// @desc       Login User
// @access     Public
exports.loginUser = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  } else {
    const { email, password } = req.body

    try {
      const userExist = await User.findOne({ email })
      if (!userExist) {
        res.status(400).json({ error: { msg: "User doesn't exist" } })
      } else {
        const isMatch = await bcrypt.compare(password, userExist.password)
        if (!isMatch) {
          res.status(400).json({ error: { msg: "Password Doesn't match" } })
        } else {
          res.json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            token: generateToken(userExist._id),
          })
        }
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: { msg: 'Server Error' } })
    }
  }
}
