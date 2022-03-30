const { validationResult } = require('express-validator')
const request = require('request')
const Profile = require('../models/profile')
const User = require('../models/users')

// @route      GET api/profile/me
// @desc       Get current use profile
// @access     Protect
exports.currentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar', 'email']
    )
    if (!profile) {
      return res
        .status(404)
        .json({ error: { msg: 'There is no profile for this user' } })
    } else {
      return res.send(profile)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: { msg: 'Server Error' } })
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
      res.status(500).json({ error: { msg: 'Server Error' } })
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
    res.status(500).json({ error: { msg: 'Server Error' } })
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
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      DELETE api/profile
// @desc       Delete user profile by self
// @access     Private
exports.userProfileDelete = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })

    res.json('User Deleted')
  } catch (error) {
    console.error(error.message)
    if (error.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ error: { msg: 'There is no profile for this user' } })
    }
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      PUT api/profile/experience
// @desc       Add experience
// @access     Private
exports.addExperience = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  } else {
    const { title, company, location, from, to, current, description } =
      req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.unshift(newExp)

      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: { msg: 'Server Error' } })
    }
  }
}

// @route      DELETE api/profile/experience
// @desc       Delete experience
// @access     Private
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.experience
      .map((item) => item._id)
      .indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex, 1)
    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      PUT api/profile/education
// @desc       Add education
// @access     Private
exports.addEducation = async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  } else {
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.education.unshift(newEdu)

      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: { msg: 'Server Error' } })
    }
  }
}

// @route      DELETE api/profile/education
// @desc       Delete education
// @access     Private
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.education
      .map((item) => item._id)
      .indexOf(req.params.edu_id)

    profile.education.splice(removeIndex, 1)
    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}

// @route      GET api/profile/github/:username
// @desc       Get user repos from github
// @access     Public
exports.userGitRepos = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc$client_id=${process.env.GIT_CLIENT}&client_secret=${process.env.GIT_SECRETS}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    }

    request(options, (error, response, body) => {
      if (error) console.error(error)

      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: 'No Github Profile Found' })
      }

      res.json(JSON.parse(body))
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: { msg: 'Server Error' } })
  }
}
