import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Tags(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.tag}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    marginRight: 10,
    backgroundColor: 'blue',
    borderRadius: 10
  },
  text: {
    color: 'white',
    textAlign: 'center',
    padding: 5
  }
})

export default Tags
