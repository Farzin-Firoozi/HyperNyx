import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

import theme from '~/theme'
import Header from '~/components/header'
import OtpInput from '~/screens/verify/otpInput'

import OtpTimer from './otpTimer'

import VerifyImage from '~/assets/images/verify.svg'

const SCREEN_WIDTH = Dimensions.get('screen').width

const VerifyScreen = () => {
  const { params } = useRoute()
  const navigation = useNavigation()

  const { phoneNumber } = params

  return (
    <View style={styles.root}>
      <Header left="back" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <VerifyImage width={SCREEN_WIDTH * 0.4} />

        <Text style={styles.title}>Verification code</Text>

        <Text style={styles.description}>
          We have sent the code verification to your Mobile Number.
        </Text>

        <Text style={styles.phone}>
          <Text>{phoneNumber}</Text>
          <Text style={styles.edit} onPress={navigation.goBack}>
            {' '}
            Edit
          </Text>
        </Text>

        <OtpInput />

        <OtpTimer phoneNumber={phoneNumber} />
      </ScrollView>
    </View>
  )
}

export default VerifyScreen

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
  content: {
    padding: theme.spacing,
    alignItems: 'center',
  },
  phone: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.darkText,
    marginBottom: theme.spacing,
  },
  edit: {
    color: theme.colors.primary,
  },
})
