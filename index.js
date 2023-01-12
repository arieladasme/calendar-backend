const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config()

// creando servidor express
const app = express()

// DB
dbConnection()

// directorio publico
app.use(express.static('public'))

// lectura y parseo del body
app.use(express.json())

// rutas
app.use('/api/auth', require('./routes/auth'))

// TODO: CRUD: eventos

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
