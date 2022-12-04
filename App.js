import React from 'react'

import { View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import Navigator from '~/screens'
import theme from '~/theme'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api-latest.hypernyx.com/graphql',
  cache: new InMemoryCache(),
})

// eslint-disable-next-line no-undef
if (!__DEV__) {
  console.log = () => {}
}

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer
          theme={{
            colors: {
              background: theme.colors.surface,
            },
          }}
        >
          <CustomStatusBar />
          <Navigator />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  )
}

export default App

const CustomStatusBar = () => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        height: insets.top,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.surface}
      />
    </View>
  )
}
