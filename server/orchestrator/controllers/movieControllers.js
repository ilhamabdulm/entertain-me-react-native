const axios = require('axios')
const redis = require('../services/redis')

class MovieControllers {
  static async getAll(req, res, next) {
    try {
      let movies = await redis.get('movies')
      if (movies) {
        res.status(200).json(JSON.parse(movies))
      } else {
        const { data } = await axios.get('http://localhost:4000')
        redis.set('movies', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.get(`http://localhost:4000/${id}`)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async addMovie(req, res, next) {
    try {
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const { data } = await axios.post('http://localhost:4000', movieData)
      redis.del('movies')
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async editMovie(req, res, next) {
    try {
      const movieData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const id = req.params.id
      const { data } = await axios.put(`http://localhost:4000/${id}`, movieData)
      redis.del('movies')
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.delete(`http://localhost:4000/${id}`)
      redis.del('movies')
      if (data.value === null) {
        throw { errCode: 404, msg: 'Movie not found' }
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MovieControllers
