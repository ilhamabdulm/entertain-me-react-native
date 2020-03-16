import React from 'react'
import { View, Image, StyleSheet, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useMutation } from '@apollo/react-hooks'

import { DELETE_MOVIE, GET_MOVIES } from '../graphql'

function ShowCard(props) {
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })

  const removeItem = () => {
    return Alert.alert(
      `Delete item from ${props.item.__typename} List`,
      `Are you sure?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => removeMovie()
        }
      ]
    )
  }

  const removeMovie = () => {
    console.log('HEY, MASUK BUAT HAPUS')
    deleteMovie({
      variables: { id: props.item._id },
      update: (cache, { data }) => {
        Alert.alert(`${data.deleteMovie.title} has been deleted from list`)
      }
    })
  }

  return (
    <View style={styles.outerCard}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.poster}
          source={{
            uri: props.item.poster_path
          }}
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.overview}>{props.item.overview}</Text>
        <Text style={styles.rating}>Rating: {props.item.popularity}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity>
            <Text style={[styles.actionButton, { backgroundColor: '#feb72b' }]}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeItem}>
            <Text style={[styles.actionButton, { backgroundColor: 'red' }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerCard: {
    flex: 2,
    height: 300,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  innerContainer: {
    flex: 1,
    height: '100%',
    padding: 10
  },
  poster: {
    height: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: '700'
  },
  overview: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 11
  },
  rating: {
    fontSize: 16
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  actionButton: {
    textAlign: 'center',
    color: 'white',
    marginRight: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 5,
    paddingTop: 5
  }
})

export default ShowCard
