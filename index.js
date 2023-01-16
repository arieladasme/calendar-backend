const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')

// creando servidor express
const app = express()

// DB
dbConnection()

// CORS
app.use(cors())

// directorio publico
app.use(express.static('public'))

// lectura y parseo del body
app.use(express.json())

// rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// TODO: CRUD: eventos

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`)
})
