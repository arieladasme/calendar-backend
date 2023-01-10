const { response } = require('express')
const { validationResult } = require('express-validator')

const createUser = (req, res = response) => {
  const { name, email, password } = req.body

  // errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    })
  }

  res.status(201).json({ register: true, name, email, password })
}

const loginUser = (req, res = response) => {
  const { email, password } = req.body

  // errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    })
  }

  res.json({ login: true, email, password })
}

const renewToken = (req, res = response) => {
  res.json({ renew: true })
}

module.exports = { createUser, loginUser, renewToken }
