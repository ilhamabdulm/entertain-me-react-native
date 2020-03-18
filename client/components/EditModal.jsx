import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Picker,
  Alert
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { useNavigation } from '@react-navigation/native'

import { EDIT_MOVIE, GET_MOVIES, EDIT_SERIES, GET_SERIES } from '../graphql'

function EditModal(props) {
  const [title, setTitle] = useState(props.itemData.title)
  const [overview, setOverview] = useState(props.itemData.overview)
  const [popularity, setPopularity] = useState(props.itemData.popularity)
  const [poster_path, setPoster] = useState(props.itemData.poster_path)
  const [type, setType] = useState('Movie')
  const [tags, setTags] = useState(props.itemData.tags)
  console.log(tags)

  const [editMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })
  const [editSeries] = useMutation(EDIT_SERIES, {
    refetchQueries: [{ query: GET_SERIES }]
  })
  const navigation = useNavigation()
  const { visible, setVisible, itemData } = props

  const handleSubmit = () => {
    if (type === 'Movie') {
      handleEditMovie()
    } else {
      handleEditSeries()
    }
  }

  const handleEditMovie = () => {
    const newTags = Array.isArray(tags) ? tags : tags.split(',')
    editMovie({
      variables: {
        id: itemData._id,
        title,
        overview,
        popularity,
        poster_path,
        newTags: newTags
      },
      update: (cache, { data }) => {
        Alert.alert('Data edited')
        navigation.navigate(`${type}s`)
      }
    })
  }

  const handleEditSeries = () => {
    const newTags = Array.isArray(tags) ? tags : tags.split(',')
    editSeries({
      variables: {
        id: itemData._id,
        title,
        overview,
        popularity,
        poster_path,
        newTags: newTags
      },
      update: (cache, { data }) => {
        Alert.alert('Data edited')
        console.log(data)
        navigation.navigate(`Series`)
      }
    })
  }

  const handlePopularity = text => {
    console.log(text)
    if (text > 10) {
      alert('Rating only allowed 0-10')
    } else {
      setPopularity(Number(text))
    }
  }

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Edit Item</Text>
        <Text>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Title"
          onChangeText={text => setTitle(text)}
          defaultValue={itemData.title}
        />
        <Text>Overview</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Overview"
          onChangeText={text => setOverview(text)}
          defaultValue={itemData.overview}
        />
        <Text>Rating</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Rating"
          keyboardType="numeric"
          onChangeText={text => handlePopularity(text)}
          defaultValue={String(itemData.popularity)}
        />
        <Text>Poster Path</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Poster Path"
          onChangeText={text => setPoster(text)}
          defaultValue={itemData.poster_path}
        />
        <Text>Tags</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Separated by comma (ex: movie,action,adventure)"
          onChangeText={text => setTags(text)}
          defaultValue={itemData.tags.join(',')}
        />
        <Text>Type</Text>
        <Picker
          selectedValue={type}
          style={{
            height: 30,
            width: '100%',
            marginBottom: 10
          }}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        >
          <Picker.Item label="Movie" value="Movie" />
          <Picker.Item label="TV Series" value="Series" />
        </Picker>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.inputButton}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10
          }}
          onPress={() => setVisible(false)}
        >
          <Text style={[styles.inputButton, { backgroundColor: 'red' }]}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: '25%',
    padding: 15
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  textInput: {
    marginBottom: 10,
    borderWidth: 1,
    fontSize: 16,
    padding: 6
  },
  inputButton: {
    backgroundColor: 'blue',
    width: '50%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    padding: 8,
    textAlign: 'center',
    borderRadius: 10
  }
})

export default EditModal
