import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Details from '../screens/Details'

const Stack = createStackNavigator()

export default function DetailNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}
