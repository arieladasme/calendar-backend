const { Router } = require('express')
const router = Router()
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
//const { fieldValidators } = require('../middlewares/field-validators')
const { jwtValidator } = require('../middlewares/jwt-validator')

// VALIDATE JWT
router.use(jwtValidator)

router.get('/', getEvents)

router.post('/', createEvent)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router
