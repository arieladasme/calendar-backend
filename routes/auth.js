/* 
    Rutas de usuario / Auth
    host + /api/auth 
*/

/* const express = require('express')
const router = express.Router */
const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { createUser, loginUser, renewToken } = require('../controllers/auth')

router.post(
  '/new',
  // middlewares
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener 6 caracteres').isLength({ min: 6 }),
  ],
  createUser
)

router.post(
  '/',
  // middlewares
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener 6 caracteres').isLength({ min: 6 }),
  ],
  loginUser
)

router.get('/renew', renewToken)

module.exports = router
