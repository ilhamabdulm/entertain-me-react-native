import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="blue" />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          marginTop: '40%',
          letterSpacing: 2,
          textTransform: 'uppercase'
        }}
      >
        Please wait ...
      </Text>
    </View>
  )
}

export default Loading
