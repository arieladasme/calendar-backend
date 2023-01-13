const { response } = require('express')
const User = require('../models/User')

const createUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese correo',
      })
    }
    user = new User(req.body)
    await user.save()

    res.status(201).json({
      register: true,
      uid: user.id,
      name: user.name,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin',
    })
  }
}

const loginUser = (req, res = response) => {
  const { email, password } = req.body
  res.json({
    login: true,
    email,
    password,
  })
}

const renewToken = (req, res = response) => {
  res.json({
    renew: true,
  })
}

module.exports = { createUser, loginUser, renewToken }
