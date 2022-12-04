import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import UserScreen from './user'
import LoginScreen from './login'
import VerifyScreen from './verify'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="verify" component={VerifyScreen} />
      <Stack.Screen name="user" component={UserScreen} />
    </Stack.Navigator>
  )
}

export default App
