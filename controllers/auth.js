const { response } = require('express')

const createUser = (req, res = response) => {
  const { name, email, password } = req.body
  res.status(201).json({ register: true, name, email, password })
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
