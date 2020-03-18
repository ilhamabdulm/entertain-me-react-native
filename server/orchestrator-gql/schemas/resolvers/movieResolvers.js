const axios = require('axios')
const redis = require('../../services/redis')

module.exports = {
  Query: {
    movies: async (parent, { id }, context, info) => {
      try {
        if (id) {
          const movie = await axios.get(`http://localhost:3000/${id}`)
          return [movie.data]
        } else {
          const movies = await redis.get('movies')
          if (movies) return JSON.parse(movies)
          const { data } = await axios.get('http://localhost:3000')
          console.log(data)
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
      { title, overview, popularity, tags, poster_path },
      context,
      info
    ) => {
      try {
        const movieData = {
          title,
          overview,
          poster_path,
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
    editMovie: async (
      parent,
      { id, title, overview, poster_path, popularity, tags }
    ) => {
      try {
        const movieData = {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
        console.log(movieData)
        const { data } = await axios.put(
          `http://localhost:3000/${id}`,
          movieData
        )
        redis.del('movies')
        return data.value
      } catch (err) {
        console.log(err)
      }
    }
  }
}
