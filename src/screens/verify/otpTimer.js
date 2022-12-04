import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import theme from '~/theme'
import Spinner from '~/components/spinner'
import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { PASSWORD_LESS_LOGIN_MUTATION } from '~/graphql/mutations'

const DEFAULT_TIME = 180

const OtpTimer = ({ phoneNumber }) => {
  const navigation = useNavigation()

  const [leftTime, setLeftTime] = useState(DEFAULT_TIME)

  const [passwordLessLogin, { loading }] = useMutation(
    PASSWORD_LESS_LOGIN_MUTATION,
    {
      onError: navigation.goBack,
      onCompleted: () => {
        setLeftTime(DEFAULT_TIME)
      },
    }
  )

  const onResendCode = () => {
    passwordLessLogin({
      variables: {
        phoneNumber,
      },
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (leftTime < 1) {
    return (
      <>
        <TouchableOpacity onPress={onResendCode} disabled={loading}>
          <Text style={[styles.timer, styles.primaryText]}>Resend code</Text>
        </TouchableOpacity>
        {!!loading && <Spinner />}
      </>
    )
  }

  return (
    <>
      <Text style={styles.timer}>
        <Text>Resend after </Text>

        <Text style={styles.primaryText}>
          {new Date(leftTime * 1000).toISOString().substring(14, 19)}
        </Text>
      </Text>
    </>
  )
}

export default OtpTimer

const styles = StyleSheet.create({
  timer: {
    color: theme.colors.darkText,
    fontWeight: '700',
    marginBottom: theme.spacing / 2,
  },
  primaryText: {
    color: theme.colors.primary,
  },
})
