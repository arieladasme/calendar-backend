const { response } = require('express')
const jwt = require('jsonwebtoken')

const jwtValidator = (req, res = response, next) => {
  // x-tokenn header
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion',
    })
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET)

    req.uid = uid
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    })
  }

  next()
}

module.exports = { jwtValidator }
