import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

function ShowCard(props) {
  const navigation = useNavigation()

  return (
    <View style={styles.innerContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            id: props.item._id,
            type: props.item.__typename
          })
        }
      >
        <Image
          style={styles.poster}
          source={{
            uri: props.item.poster_path
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 20,
    height: 250,
    width: '45%'
  },
  poster: {
    height: '100%',
    width: '100%'
  }
})

export default ShowCard
