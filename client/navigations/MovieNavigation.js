import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Movies from '../screens/Movies'
import Details from '../screens/Details'

const Stack = createStackNavigator()

export default function MovieNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
