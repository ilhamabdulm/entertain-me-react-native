const router = require('express').Router()
const MovieControllers = require('../controllers/movieControllers')

router.get('/', MovieControllers.getAll)
router.get('/:id', MovieControllers.getOne)
router.post('/', MovieControllers.addMovie)
router.put('/:id', MovieControllers.editMovie)
router.delete('/:id', MovieControllers.deleteMovie)

module.exports = router
