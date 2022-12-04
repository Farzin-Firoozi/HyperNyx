import React, { useEffect, useRef, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import theme from '~/theme'
import Spinner from '~/components/spinner'
import { LOGIN_WITH_CODE_MUTATION } from '~/graphql/mutations'

const OtpInput = () => {
  const inputRef = useRef(null)
  const navigation = useNavigation()

  const [otp, setOtp] = useState('')
  const [error, setError] = useState(null)
  const [isFocused, setIsFocused] = useState(false)

  const activeBox = Math.min(otp.split('').length, 3)

  const [loginWithCode, { loading }] = useMutation(LOGIN_WITH_CODE_MUTATION, {
    onError: (err) => {
      // console.log(err)
      setError(err.message)
    },
    onCompleted: (data) => {
      console.log('completed')
      console.log(data.loginWithCode)
      navigation.navigate('user', {
        accessToken: data?.loginWithCode?.accessToken,
      })
    },
  })

  const onFocus = () => {
    if (!inputRef.current) {
      return
    }
    inputRef.current.focus()
    setIsFocused(true)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onSubmitHandler = () => {
    onBlur()
    loginWithCode({ variables: { code: +otp } })
  }

  useEffect(() => {
    if (otp.length === 4) {
      onSubmitHandler()
    }
    if (error) {
      setError(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp.length])

  return (
    <>
      <View style={styles.root}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <OtpBox
              key={`${index}-otp`}
              onFocus={onFocus}
              isActive={isFocused && activeBox === index}
              value={otp[index] || ''}
            />
          ))}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        value={otp}
        ref={inputRef}
        onBlur={onBlur}
        onChangeText={setOtp}
        keyboardType="number-pad"
        style={styles.hiddenInput}
      />

      {!!loading && <Spinner />}
    </>
  )
}

export default OtpInput

const OtpBox = ({ value, onFocus, isActive }) => {
  return (
    <Pressable
      onPress={onFocus}
      style={[styles.box, isActive && styles.activeBox]}
    >
      <Text style={styles.boxText}>{value}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing,
  },
  box: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: theme.radius,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing / 2,
  },
  activeBox: {
    borderColor: theme.colors.primary,
  },
  boxText: {
    color: theme.colors.darkText,
    fontSize: 20,
    fontWeight: '700',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: theme.spacing,
  },
})
