import { gql } from 'apollo-boost'

export const GET_MOVIES = gql`
  query {
    movies {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const GET_SERIES = gql`
  query {
    series {
      _id
      title
    }
  }
`
export const DELETE_MOVIE = gql`
  mutation actionDeleteMovie($id: ID) {
    deleteMovie(id: $id) {
      title
    }
  }
`

export const ADD_MOVIE = gql`
  mutation inputMovie(
    $title: String!
    $overview: String!
    $popularity: Int!
    $poster_path: String!
    $newTags: [String]!
  ) {
    addMovie(
      title: $title
      overview: $overview
      popularity: $popularity
      poster_path: $poster_path
      tags: $newTags
    ) {
      _id
      title
    }
  }
`
