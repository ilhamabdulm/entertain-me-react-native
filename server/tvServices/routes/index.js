const router = require('express').Router()

const tvRooutes = require('./tvRoutes')

router.use('/', tvRooutes)

module.exports = router
