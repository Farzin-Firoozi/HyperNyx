/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'

import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Animated, {
  Easing,
  withRepeat,
  withTiming,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from 'react-native-reanimated'

import theme from '~/theme'
import Spinner from './spinner'

const Button = ({
  children,
  onPress = () => {},
  loading = false,
  style = {},
  variant = 'primary',
  disabled = false,
}) => {
  const sharedValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: sharedValue.value,
    }
  })

  useEffect(() => {
    if (loading) {
      sharedValue.value = withRepeat(
        withTiming(theme.spacing, { easing: Easing.linear, duration: 500 }),
        Infinity,
        true
      )
    } else {
      sharedValue.value = withTiming(0)
    }
    return () => cancelAnimation(sharedValue)
  }, [loading])

  return (
    <Animated.View style={[styles.root, animatedStyle, style]}>
      <TouchableOpacity
        style={[styles.button, styles[variant], disabled && styles.disabled]}
        onPress={onPress}
        disabled={disabled}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Text style={[styles.text, styles[`${variant}Text`]]}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Button

const styles = StyleSheet.create({
  root: {
    height: 48,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.border,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
  primaryText: {
    color: theme.colors.surface,
  },
  secondaryText: {
    color: theme.colors.lightText,
  },
  disabled: {
    opacity: 0.6,
  },
})
