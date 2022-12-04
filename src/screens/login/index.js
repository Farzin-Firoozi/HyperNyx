/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

import {
  View,
  Text,
  Linking,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native'

import theme from '~/theme'
import Button from '~/components/button'
import Header from '~/components/header'
import Checkbox from '~/components/checkbox'
import PhoneInput from '~/screens/login/phoneInput'

import { PASSWORD_LESS_LOGIN_MUTATION } from '~/graphql/mutations'

import LoginImage from '~/assets/images/login.svg'

const SCREEN_WIDTH = Dimensions.get('screen').width

const LoginScreen = () => {
  const navigation = useNavigation()

  const [errors, setErrors] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [rulesAccepted, setRulesAccepted] = useState(false)

  const onOpenRules = () => {
    Linking.openURL('https://google.com')
  }

  useEffect(() => {
    if (errors.length) {
      setErrors([])
    }
  }, [phoneNumber.length])

  const [passwordLessLogin, { loading }] = useMutation(
    PASSWORD_LESS_LOGIN_MUTATION,
    {
      onError: (err) => {
        const allErrors = err.graphQLErrors.map(
          (item) => item.extensions.response.message
        )

        setErrors(allErrors)
      },
      onCompleted: () => {
        navigation.navigate('verify', { phoneNumber })
      },
    }
  )

  const onSubmit = () => {
    passwordLessLogin({
      variables: {
        phoneNumber,
      },
    })
  }

  return (
    <View style={styles.root}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <LoginImage width={SCREEN_WIDTH * 0.4} />

        <Text style={styles.title}>Verify your phone</Text>

        <Text style={styles.description}>
          Enter your phone number and use the service as authenticated user
        </Text>

        <PhoneInput
          value={phoneNumber}
          setValue={setPhoneNumber}
          error={errors[0]}
        />

        <View style={styles.row}>
          <View style={styles.checkbox}>
            <Checkbox onChange={setRulesAccepted} checked={rulesAccepted} />
          </View>
          <Text style={styles.eula}>
            <Text>
              <Text>I have read the</Text>
              <Text onPress={onOpenRules} style={styles.primaryText}>
                {' '}
                rules and conditions{' '}
              </Text>
              <Text>
                of the Hypernix application and by ticking this box, I declare
                my agreement.
              </Text>
            </Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <Button
          variant="primary"
          loading={loading}
          onPress={onSubmit}
          disabled={!rulesAccepted || phoneNumber.length === 0}
        >
          Log in
        </Button>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.divider}>or</Text>
          <View style={styles.line} />
        </View>

        <Button variant="secondary">Use Offline</Button>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.darkText,
    marginVertical: theme.spacing,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.lightText,
    lineHeight: 24,
    marginBottom: theme.spacing,
  },
  eula: {
    lineHeight: 24,
    color: theme.colors.darkText,
  },
  primaryText: {
    color: theme.colors.primary,
  },
  content: {
    padding: theme.spacing,
    alignItems: 'center',
  },
  actions: {
    padding: theme.spacing,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginVertical: theme.spacing,
    marginHorizontal: theme.spacing / 2,
    color: theme.colors.darkText,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
  },
  line: {
    flex: 1,
    backgroundColor: theme.colors.border,
    height: 1,
    borderRadius: 2,
  },
  row: {
    marginTop: theme.spacing,
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 10,
    marginTop: 4,
  },
})
