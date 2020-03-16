const { gql } = require('apollo-server')

module.exports = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    popularity: Int
    tags: [String]
  }

  extend type Query {
    movies(id: ID): [Movie]
  }

  extend type Mutation {
    addMovie(
      title: String!
      overview: String!
      popularity: Int!
      tags: [String]!
    ): Movie
    deleteMovie(id: ID): Movie
    editMovie(
      id: ID!
      title: String!
      overview: String!
      popularity: Int!
      tags: [String]!
    ): Movie
  }
`
