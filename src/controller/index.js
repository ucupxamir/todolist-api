const router = require('express').Router()

router.use('/tasks', require('./task.controller'))

module.exports = router