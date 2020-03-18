import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import { GET_MOVIE_DETAILS, GET_SERIES_DETAILS } from '../graphql'
import Loading from '../components/Loading'
import ShowDetails from '../components/ShowDetails'

function Details({ route, navigation }) {
  const { id, type } = route.params
  if (type === 'Movie') {
    const { loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
      variables: { id: id }
    })
    if (loading) {
      return (
        <View
          style={{
            marginTop: '50%'
          }}
        >
          <Loading />
        </View>
      )
    } else if (error) {
      return (
        <View>
          <Text>Error gan, {error}</Text>
        </View>
      )
    } else {
      const movie = data.movies[0]
      return <ShowDetails item={movie} />
    }
  } else {
    const { loading, error, data } = useQuery(GET_SERIES_DETAILS, {
      variables: { id: id }
    })
    if (loading) {
      return (
        <View
          style={{
            marginTop: '50%'
          }}
        >
          <Loading />
        </View>
      )
    } else if (error) {
      return (
        <View>
          <Text>Error gan, {error}</Text>
        </View>
      )
    } else {
      const series = data.series[0]
      return <ShowDetails item={series} />
    }
  }
}

export default Details
