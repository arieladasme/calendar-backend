const { response } = require('express')
const bcrypt = require('bcryptjs')
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
    const salt = bcrypt.genSaltSync()
    user.password = await bcrypt.hashSync(password, salt)

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

const loginUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese correo',
      })
    }

    const validPassword = await bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta',
      })
    }

    //JWT validation
    return res.json({
      ok: true,
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
