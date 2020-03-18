import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Series from '../screens/Series'
import Details from '../screens/Details'

const Stack = createStackNavigator()

export default function SeriesNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Series"
        component={Series}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
