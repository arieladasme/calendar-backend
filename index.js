const express = require('express')
require('dotenv').config()

// creando servidor express
const app = express()

// directorio publico
app.use(express.static('public'))

// rutas
app.use('/api/auth', require('./routes/auth'))

// TODO: CRUD: eventos

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
