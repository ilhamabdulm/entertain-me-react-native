import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = new createStackNavigator()

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen></Stack.Screen>
    </Stack.Navigator>
  )
}

export default RootNavigation
