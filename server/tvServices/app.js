if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')

const mongoConnect = require('./services/mongoConnect')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(mongoConnect)
app.use('/', routes)
app.use(errorHandler)

module.exports = app
