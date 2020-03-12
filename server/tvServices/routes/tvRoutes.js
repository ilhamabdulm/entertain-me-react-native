const router = require('express').Router()
const TvControllers = require('../controllers/tvControllers')

router.get('/', TvControllers.getAll)
router.get('/:id', TvControllers.getOne)
router.post('/', TvControllers.addSeries)
router.put('/:id', TvControllers.updateSeries)
router.delete('/:id', TvControllers.deleteSeries)

module.exports = router
