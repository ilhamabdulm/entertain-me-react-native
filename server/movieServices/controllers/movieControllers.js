class MovieControllers {
  static getAll(req, res, next) {
    const Movie = req.database
    Movie.findAll()
      .then(docs => {
        res.status(200).json(docs)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const Movie = req.database
    const id = req.params.id
    Movie.findOne({ _id: id })
      .then(doc => {
        res.status(200).json(doc[0])
      })
      .catch(next)
  }

  static addMovie(req, res, next) {
    const Movie = req.database
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    Movie.create(data)
      .then(response => {
        res.status(200).json(response.ops[0])
      })
      .catch(next)
  }

  static deleteMovie(req, res, next) {
    const Movie = req.database
    const id = req.params.id
    Movie.deleteById(id)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static updateMovie(req, res, next) {
    const Movie = req.database
    const id = req.params.id
    const data = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }
    Movie.updateById(id, data)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }
}

module.exports = MovieControllers
