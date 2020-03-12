const router = require('express').Router()

const movieRoutes = require('../routes/movieRoutes')

router.use('/', movieRoutes)

module.exports = router
