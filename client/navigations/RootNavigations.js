import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import AddForm from '../screens/AddForm'
import Movies from '../screens/Movies'
import Series from '../screens/Series'
import DetailNavigation from '../navigations/DetailNavigation'

const Stack = new createStackNavigator()
const Tab = new createBottomTabNavigator()

function RootNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Movies') {
            iconName = focused ? 'ios-film' : 'md-film'
          } else if (route.name === 'Series') {
            iconName = focused ? 'ios-tv' : 'md-tv'
          } else if (route.name === 'Add New') {
            iconName = focused ? 'ios-add-circle-outline' : 'ios-add-circle'
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name="Detail" component={DetailNavigation} />
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Add New" component={AddForm} />
      <Tab.Screen name="Series" component={Series} />
    </Tab.Navigator>
  )
}

export default RootNavigation
