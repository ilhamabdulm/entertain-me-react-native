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

export const GET_MOVIE_DETAILS = gql`
  query getDetails($id: ID) {
    movies(id: $id) {
      _id
      title
      overview
      popularity
      poster_path
      tags
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
    $popularity: Float!
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

export const EDIT_MOVIE = gql`
  mutation inputEdit(
    $id: ID!
    $title: String!
    $overview: String!
    $popularity: Float!
    $poster_path: String!
    $newTags: [String]!
  ) {
    editMovie(
      id: $id
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

export const GET_SERIES = gql`
  query {
    series {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const GET_SERIES_DETAILS = gql`
  query getDetails($id: ID) {
    series(id: $id) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

export const DELETE_SERIES = gql`
  mutation actionDeleteSeries($id: ID) {
    deleteSeries(id: $id) {
      title
    }
  }
`

export const ADD_SERIES = gql`
  mutation inputSeries(
    $title: String!
    $overview: String!
    $popularity: Float!
    $poster_path: String!
    $newTags: [String]!
  ) {
    addSeries(
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

export const EDIT_SERIES = gql`
  mutation inputEdit(
    $id: ID!
    $title: String!
    $overview: String!
    $popularity: Float!
    $poster_path: String!
    $newTags: [String]!
  ) {
    editSeries(
      id: $id
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
