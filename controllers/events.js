const { response } = require('express')
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name')

  res.json({
    ok: true,
    events,
  })
}

const createEvent = async (req, res = response) => {
  const event = new Event(req.body)

  try {
    event.user = req.uid
    const newEvent = await event.save()

    res.json({
      ok: true,
      msg: 'createEvent',
      event: newEvent,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el admin',
    })
  }
}

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id

  try {
    //const event = await Event.findByIdAndUpdate(eventId, req.body, { new: true })
    const event = await Event.findById(eventId)

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontró el evento',
      })
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes permiso para editar este evento',
      })
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

    res.json({
      ok: true,
      event: updatedEvent,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el admin',
    })
  }
}

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteEvent',
  })
}

module.exports = { getEvents, createEvent, updateEvent, updateEvent, deleteEvent }
