import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import { GET_MOVIES } from '../graphql'
import ShowCard from '../components/ShowCard'
import Loading from '../components/Loading'

function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES)
  console.log(data)
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
      <FlatList
        data={data.movies}
        renderItem={({ item }) => <ShowCard key={item.id} item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 30,
    textAlign: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  }
})

export default Movies
