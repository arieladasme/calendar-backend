const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.set('strictQuery', false).connect(process.env.DB_CNN)
    console.log('DB online')
  } catch (error) {
    console.log(error)

    throw new Error('Error al iniciar DB')
  }
}

module.exports = { dbConnection }
