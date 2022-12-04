/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'

import Animated, {
  Easing,
  withRepeat,
  withTiming,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from 'react-native-reanimated'

import theme from '~/theme'

const Spinner = () => {
  const rotation = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }
  }, [rotation.value])

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    )
    return () => cancelAnimation(rotation)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, animatedStyles]} />
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  spinner: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderTopColor: theme.colors.secondary,
    borderRightColor: theme.colors.secondary,
    borderBottomColor: theme.colors.secondary,
    borderLeftColor: theme.colors.primary,
  },
})
