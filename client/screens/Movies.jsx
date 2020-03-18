import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import { GET_MOVIES } from '../graphql'
import ListView from '../components/ListView'
import Loading from '../components/Loading'

function Movies({ route }) {
  const { loading, error, data } = useQuery(GET_MOVIES)
  console.log(route)
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
        <Text>Error, {error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie List</Text>
      {data.movies.length > 0 ? (
        <ListView data={data.movies} />
      ) : (
        <Text>There are no movie here</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    textAlign: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  }
})

export default Movies
