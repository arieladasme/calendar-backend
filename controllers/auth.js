const { response } = require('express')

const createUser = (req, res = response) => {
  const { name, email, password } = req.body

  if (name.length < 5) {
    return res.status(400).json({
      register: true,
      msg: 'el nombre debe tener 5 letras',
    })
  }

  res.json({ register: true, name, email, password })
}

const loginUser = (req, res = response) => {
  const { email, password } = req.body

  res.json({ login: true, email, password })
}

const renewToken = (req, res = response) => {
  res.json({ renew: true })
}
module.exports = { createUser, loginUser, renewToken }
