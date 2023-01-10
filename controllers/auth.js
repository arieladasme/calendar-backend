const { response } = require('express')

const createUser = (req, res = response) => {
  res.json({ register: true })
}

const loginUser = (req, res = response) => {
  res.json({ login: true })
}

const renewToken = (req, res = response) => {
  res.json({ renew: true })
}
module.exports = { createUser, loginUser, renewToken }
