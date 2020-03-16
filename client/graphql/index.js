import { gql } from 'apollo-boost'

export const GET_MOVIES = gql`
  query {
    movies {
      _id
      title
      overview
      popularity
      poster_path
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
