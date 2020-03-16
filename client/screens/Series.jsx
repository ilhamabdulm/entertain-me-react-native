import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import { GET_SERIES } from '../graphql'

function Series() {
  const { loading, error, data } = useQuery(GET_SERIES)
  console.log(data)

  if (loading) {
    return (
      <View>
        <Text>Ini loading</Text>
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
      <Text>This is Series Page</Text>
      <FlatList
        data={data.series}
        renderItem={({ item }) => <Text key={item.title}>{item.title}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 100,
    textAlign: 'center',
    alignItems: 'center'
  }
})

export default Series
