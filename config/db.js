const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION)
    } catch (error) {
        throw new Error('Error al intentar conectar con la base de datos')
    }
}

module.exports = {
    dbConnection
}