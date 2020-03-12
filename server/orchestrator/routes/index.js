const router = require('express').Router()
const Movie = require('./movies')
const Tv = require('./tv')

router.use('/movies', Movie)
router.use('/tv', Tv)

module.exports = router
