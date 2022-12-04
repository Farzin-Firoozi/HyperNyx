import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import CheckIcon from '~/assets/icons/check.svg'
import theme from '~/theme'

const Checkbox = ({ onChange = () => {}, checked }) => {
  const onPressHandler = () => {
    onChange(!checked)
  }

  return (
    <TouchableOpacity
      style={[styles.root, checked && styles.checked]}
      onPress={onPressHandler}
    >
      {checked && (
        <CheckIcon width={14} stroke={theme.colors.surface} strokeWidth={4} />
      )}
    </TouchableOpacity>
  )
}

export default Checkbox

const styles = StyleSheet.create({
  root: {
    width: 20,
    aspectRatio: 1,
    borderRadius: 6,
    borderColor: theme.colors.lightText,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
})
