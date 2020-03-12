class TvControllers {
  static getAll(req, res, next) {
    const Series = req.database
    Series.findAll()
      .then(docs => {
        res.status(200).json(docs)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const Series = req.database
    const id = req.params.id
    Series.findOne({ _id: id })
      .then(doc => {
        res.status(200).json(doc[0])
      })
      .catch(next)
  }

  static addSeries(req, res, next) {
    const Series = req.database
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    Series.create(data)
      .then(response => {
        res.status(200).json(response.ops[0])
      })
      .catch(next)
  }

  static deleteSeries(req, res, next) {
    const Series = req.database
    const id = req.params.id
    Series.deleteById(id)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static updateSeries(req, res, next) {
    const Series = req.database
    const id = req.params.id
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    Series.updateById(id, data)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }
}

module.exports = TvControllers
