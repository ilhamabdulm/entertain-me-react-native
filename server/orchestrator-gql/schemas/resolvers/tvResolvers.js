const axios = require('axios')

module.exports = {
  Query: {
    series: async (parent, args, context, info) => {
      const { data } = await axios.get('http://localhost:5000')
      return data
    }
  },
  Mutation: {
    addSeries: async (
      parent,
      { title, overview, popularity, tags },
      context,
      info
    ) => {
      const movieData = {
        title,
        overview,
        popularity,
        tags
      }
      const { data } = await axios.post('http://localhost:5000', movieData)
      return data
    }
  }
}
