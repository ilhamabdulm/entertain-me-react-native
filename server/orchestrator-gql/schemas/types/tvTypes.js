const { gql } = require('apollo-server')

module.exports = gql`
  type TvSeries {
    _id: ID
    title: String
    overview: String
    popularity: Float
    tags: [String]
    poster_path: String
  }

  extend type Query {
    series(id: ID): [TvSeries]
  }

  extend type Mutation {
    addSeries(
      title: String!
      overview: String!
      popularity: Float!
      tags: [String]!
      poster_path: String!
    ): TvSeries
    deleteSeries(id: ID): TvSeries
    editSeries(
      id: ID!
      title: String!
      overview: String!
      poster_path: String!
      popularity: Float!
      tags: [String]!
    ): TvSeries
  }
`
