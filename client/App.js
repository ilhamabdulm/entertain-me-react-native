import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider } from '@apollo/react-hooks'

import client from './config/gql'
import RootNavigation from './navigations/RootNavigations'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ApolloProvider>
  )
}
