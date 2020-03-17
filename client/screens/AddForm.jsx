import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Picker
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'

import { ADD_MOVIE, GET_MOVIES } from '../graphql/index'

function AddForm() {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [poster_path, setPoster] = useState('')
  const [type, setType] = useState('Movie')
  const [tags, setTags] = useState('')

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })

  const confirmInput = () => {
    console.log(type)
    if (type === 'Movie') {
      addNewMovie()
    }
  }

  const addNewMovie = () => {
    const newTags = tags.split(',')
    console.log(newTags)
    addMovie({
      variables: { title, overview, popularity, poster_path, newTags: newTags },
      update: (cache, { data }) => {
        Alert.alert('New movie has been added')
      }
    })
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>Add New</Text>
      <Text>Title</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        onChangeText={text => setTitle(text)}
      />
      <Text>Overview</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Overview"
        onChangeText={text => setOverview(text)}
      />
      <Text>Rating</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Rating"
        keyboardType="numeric"
        onChangeText={text => setPopularity(Number(text))}
      />
      <Text>Poster Path</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Poster Path"
        onChangeText={text => setPoster(text)}
      />
      <Text>Tags</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Separated by comma (ex: movie,action,adventure)"
        onChangeText={text => setTags(text)}
      />
      <Text>Type</Text>
      <Picker
        selectedValue={type}
        style={{
          height: 30,
          width: '100%',
          marginBottom: 10
        }}
        onValueChange={(itemValue, itemIndes) => setType(itemValue)}
      >
        <Picker.Item label="Movie" value="Movie" />
        <Picker.Item label="TV Series" value="Series" />
      </Picker>
      <TouchableOpacity onPress={confirmInput}>
        <Text style={styles.inputButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: '30%',
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

export default AddForm
