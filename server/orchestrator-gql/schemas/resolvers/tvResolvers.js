const axios = require('axios')
const redis = require('../../services/redis')

module.exports = {
  Query: {
    series: async (parent, { id }, context, info) => {
      try {
        if (id) {
          const series = await axios.get(`http://localhost:5000/${id}`)
          return [series.data]
        } else {
          const series = await redis.get('series')
          if (series) return JSON.parse(series)
          const { data } = await axios.get('http://localhost:5000')
          redis.set('series', JSON.stringify(data))
          redis.expire('series', 3600)
          return data
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    addSeries: async (
      parent,
      { title, overview, popularity, tags, poster_path },
      context,
      info
    ) => {
      const seriesData = {
        title,
        overview,
        popularity,
        tags,
        poster_path
      }
      const { data } = await axios.post('http://localhost:5000', seriesData)
      redis.del('series')
      return data
    },
    deleteSeries: async (parent, { id }) => {
      try {
        console.log(id)
        const { data } = await axios.delete(`http://localhost:5000/${id}`)
        redis.del('series')
        return data.value
      } catch (err) {
        console.log(err)
      }
    },
    editSeries: async (
      parent,
      { id, title, overview, poster_path, popularity, tags }
    ) => {
      try {
        const seriesData = {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
        const { data } = await axios.put(
          `http://localhost:5000/${id}`,
          seriesData
        )
        redis.del('series')
        return data.value
      } catch (err) {
        console.log(err)
      }
    }
  }
}
