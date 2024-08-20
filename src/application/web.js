const express = require('express')
const errorMiddleware = require('../error/error-middleware')
const api = require('../controller')

const web = express()

web.use(express.json())
web.use('/api', api)
web.use(errorMiddleware)

module.exports = web