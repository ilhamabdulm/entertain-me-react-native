const { gql } = require('apollo-server')

module.exports = gql`
  type TvSeries {
    _id: ID
    title: String
    overview: String
    popularity: Int
    tags: [String]
  }

  extend type Query {
    series: [TvSeries]
  }

  extend type Mutation {
    addSeries(
      title: String!
      overview: String!
      popularity: Int!
      tags: [String]!
    ): Movie
  }
`
