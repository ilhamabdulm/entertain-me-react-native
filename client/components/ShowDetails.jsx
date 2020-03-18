import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import Tags from './Tags'
import EditModal from './EditModal'
import { DELETE_MOVIE, GET_MOVIES, DELETE_SERIES, GET_SERIES } from '../graphql'

function ShowDetails(props) {
  const [modalShow, setModal] = useState(false)
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })
  const [deleteSeries] = useMutation(DELETE_SERIES, {
    refetchQueries: [{ query: GET_SERIES }]
  })
  const navigation = useNavigation()

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
          onPress: () =>
            props.item.__typename === 'Movie' ? removeMovie() : removeSeries()
        }
      ]
    )
  }

  const removeMovie = () => {
    deleteMovie({
      variables: { id: props.item._id },
      update: (cache, { data }) => {
        Alert.alert(`${data.deleteMovie.title} has been deleted from list`)
        navigation.navigate(`${props.item.__typename}s`)
      }
    })
  }

  const removeSeries = () => {
    deleteSeries({
      variables: { id: props.item._id },
      update: (cache, { data }) => {
        Alert.alert(`${data.deleteSeries.title} has been deleted from list`)
        navigation.navigate(`Series`)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagePoster}
        source={{ uri: props.item.poster_path }}
      />
      <Text style={styles.title}>{props.item.title}</Text>
      <Text style={styles.info}>
        <Ionicons name="ios-star" color="gold" size={20} />{' '}
        {props.item.popularity}
      </Text>
      <View style={styles.tagStyle}>
        {props.item.tags.map(tag => (
          <Tags key={tag} tag={tag} />
        ))}
      </View>
      <Text style={styles.description}>{props.item.overview}</Text>
      <View style={styles.actionoContainer}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text style={[styles.actionButton, { backgroundColor: 'orange' }]}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeItem}>
          <Text style={[styles.actionButton, { backgroundColor: 'red' }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>

      <EditModal
        visible={modalShow}
        setVisible={setModal}
        itemData={props.item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    padding: 10,
    flex: 1,
    flexDirection: 'column'
  },
  imagePoster: {
    height: '50%',
    width: '55%',
    alignSelf: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 12,
    marginBottom: 10
  },
  info: {
    fontSize: 16,
    textAlign: 'center'
  },
  tagStyle: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10
  },
  actionoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  actionButton: {
    marginRight: 10,
    textAlign: 'center',
    color: 'white',
    marginRight: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 5,
    paddingTop: 5,
    width: 100,
    marginBottom: 10
  }
})

export default ShowDetails
