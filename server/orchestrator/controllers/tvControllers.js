const axios = require('axios')
const redis = require('../services/redis')

class TvControllers {
  static async getAll(req, res, next) {
    try {
      let series = await redis.get('series')
      if (series) {
        res.status(200).json(JSON.parse(series))
      } else {
        const { data } = await axios.get('http://localhost:5000')
        redis.set('series', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.get(`http://localhost:5000/${id}`)
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async addSeries(req, res, next) {
    try {
      const seriesData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const { data } = await axios.post('http://localhost:5000', seriesData)
      redis.del('series')
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async editSeries(req, res, next) {
    try {
      const seriesData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const id = req.params.id
      const { data } = await axios.put(
        `http://localhost:5000/${id}`,
        seriesData
      )
      redis.del('series')
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async deleteSeries(req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.delete(`http://localhost:5000/${id}`)
      redis.del('series')
      if (data.value === null) {
        throw { errCode: 404, msg: 'Series not found' }
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TvControllers
