import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Picker,
  KeyboardAvoidingView
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'

import { ADD_MOVIE, GET_MOVIES, ADD_SERIES, GET_SERIES } from '../graphql/index'

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
  const [addSeries] = useMutation(ADD_SERIES, {
    refetchQueries: [{ query: GET_SERIES }]
  })

  const confirmInput = () => {
    console.log(type)
    if (type === 'Movie') {
      addNewMovie()
    } else {
      addNewSeries()
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

  const addNewSeries = () => {
    const newTags = tags.split(',')
    console.log(newTags)
    addSeries({
      variables: { title, overview, popularity, poster_path, newTags: newTags },
      update: (cache, { data }) => {
        Alert.alert('New TV Series has been added')
      }
    })
  }

  const handlePopularity = text => {
    if (text > 10) {
      alert('Rating only allowed 0-10')
    } else {
      setPopularity(Number(text))
    }
  }

  return (
    <KeyboardAvoidingView>
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
          selectTextOnFocus={true}
          onChangeText={text => setOverview(text)}
        />
        <Text>Rating</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Rating (0-10)"
          keyboardType="numeric"
          onChangeText={text => handlePopularity(text)}
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
    </KeyboardAvoidingView>
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
