const axios = require('axios')
const redis = require('../../services/redis')

module.exports = {
  Query: {
    movies: async (parent, { id }, context, info) => {
      try {
        const movies = await redis.get('movies')
        if (movies) return JSON.parse(movies)
        if (id) {
          const movie = await axios.get(`http://localhost:3000/${id}`)
          return [movie.data]
        } else {
          const { data } = await axios.get('http://localhost:3000')
          redis.set('movies', JSON.stringify(data))
          return data
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  Mutation: {
    addMovie: async (
      parent,
      { title, overview, popularity, tags },
      context,
      info
    ) => {
      try {
        const movieData = {
          title,
          overview,
          popularity,
          tags
        }
        const { data } = await axios.post('http://localhost:3000', movieData)
        redis.del('movies')
        return data
      } catch (err) {
        console.log(err)
      }
    },
    deleteMovie: async (parent, { id }) => {
      try {
        const { data } = await axios.delete(`http://localhost:3000/${id}`)
        redis.del('movies')
        return data.value
      } catch (err) {
        console.log(err)
      }
    },
    editMovie: async (parent, { id, title, overview, popularity, tags }) => {
      try {
        const movieData = {
          title,
          overview,
          popularity,
          tags
        }
        const { data } = await axios.put(
          `http://localhost:3000/${id}`,
          movieData
        )
        console.log(data)
        return data.value
      } catch (err) {
        console.log(err)
      }
    }
  }
}
