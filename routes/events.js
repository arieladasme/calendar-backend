const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const { fieldValidators } = require('../middlewares/field-validators')
const { jwtValidator } = require('../middlewares/jwt-validator')

// VALIDATE JWT
router.use(jwtValidator)

router.get('/', getEvents)

router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha inicio obligatoria').custom(isDate),
    check('end', 'Fecha final obligatoria').custom(isDate),
    fieldValidators,
  ],
  createEvent
)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router
