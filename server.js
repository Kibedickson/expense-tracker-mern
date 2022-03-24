const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const mongoose = require('mongoose')

dotenv.config()

mongoose.connect(process.env.MONGO_DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log('Connected to MongoDB'.green)

    const transactions = require('./routes/transactions')

    const app = express()

    app.use(express.json())

    app.use('/api/v1/transactions', transactions)

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow.bold))
})