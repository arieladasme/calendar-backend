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
const { fieldValidators } = require('../middlewares/field-validators')
const { jwtValidator } = require('../middlewares/jwt-validator')

router.post(
  '/new',
  // middlewares
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener 6 caracteres').isLength({ min: 6 }),
    fieldValidators,
  ],
  createUser
)

router.post(
  '/',
  // middlewares
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener 6 caracteres').isLength({ min: 6 }),
    fieldValidators,
  ],
  loginUser
)

router.get('/renew', jwtValidator, renewToken)

module.exports = router
