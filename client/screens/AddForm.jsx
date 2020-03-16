import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

function AddForm() {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>Add New</Text>
      <Text>Title</Text>
      <TextInput style={styles.textInput} placeholder="Title" />
      <Text>Overview</Text>
      <TextInput style={styles.textInput} placeholder="Overview" />
      <Text>Rating</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Rating"
        keyboardType="numeric"
      />
      <Text>Poster Path</Text>
      <TextInput style={styles.textInput} placeholder="Poster Path" />
      <TouchableOpacity>
        <Text style={styles.inputButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: '50%',
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
