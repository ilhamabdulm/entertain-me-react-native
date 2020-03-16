const { merge } = require('lodash')
const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query
  type Mutation
`

const movieTypes = require('./types/movieTypes')
const tvTypes = require('./types/tvTypes')

const movieResolver = require('./resolvers/movieResolvers')
const tvResolvers = require('./resolvers/tvResolvers')

module.exports = {
  typeDefs: [typeDefs, movieTypes, tvTypes],
  resolvers: merge(movieResolver, tvResolvers)
}
