const { validationResult } = require('express-validator')
const Profile = require('../models/profile')

// @route      GET api/profile/me
// @desc       Get current use profile
// @access     Protected
exports.currentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar', 'email']
    )
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.send(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @route      POST api/profile
// @desc       Create New User
// @access     Protected
exports.createProfile = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  } else {
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body

    //Build profile object
    const profileFields = {
      user: req.user.id,
      company: company && company,
      website: website && website,
      location: location && location,
      bio: bio && bio,
      status: status && status,
      githubusername: githubusername && githubusername,
      skills: skills && skills.split(',').map((skill) => skill.trim()),
      social: {
        youtube: youtube && youtube,
        facebook: facebook && facebook,
        twitter: twitter && twitter,
        instagram: instagram && instagram,
        linkedin: linkedin && linkedin,
      },
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        res.json(profile)
      } else {
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
}

// @route      GET api/profile
// @desc       Get all users profile
// @access     Public
exports.usersProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'email',
    ])
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @route      GET api/profile/user/:user_id
// @desc       Get user profile
// @access     Public
exports.userProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'email'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    } else {
      res.json(profile)
    }
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.status(500).send('Server Error')
  }
}
