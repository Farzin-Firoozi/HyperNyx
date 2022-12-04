import React from 'react'

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import theme from '~/theme'

import IranFlag from '~/assets/images/flag.svg'
import CrossIcon from '~/assets/icons/cross.svg'
import DownChevron from '~/assets/icons/down.svg'

const PhoneInput = ({ value, setValue, error }) => {
  const onClear = () => {
    setValue('')
  }

  return (
    <View style={styles.root}>
      <Text style={styles.label}>Phone Number</Text>

      <View style={[styles.inputWrapper, !!error && styles.inputError]}>
        <TouchableOpacity style={styles.flagWrapper}>
          <IranFlag width={20} />
          <View style={styles.divider} />
          <DownChevron width={20} />
        </TouchableOpacity>

        <TextInput
          value={value}
          style={styles.input}
          placeholder="+98"
          onChangeText={setValue}
          keyboardType="phone-pad"
        />

        {value?.length > 0 && (
          <TouchableOpacity style={styles.clearIcon} onPress={onClear}>
            <CrossIcon width={16} />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default PhoneInput

const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'flex-start',
    position: 'relative',
  },
  label: {
    fontWeight: '700',
    color: theme.colors.darkText,
    marginBottom: 5,
  },
  inputWrapper: {
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.secondary,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  input: {
    padding: theme.spacing / 2,
    flex: 1,
  },
  clearIcon: {
    paddingHorizontal: theme.spacing / 2,
  },
  flagWrapper: {
    backgroundColor: theme.colors.darkSurface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing / 2,
    borderRightColor: theme.colors.border,
    borderRightWidth: 1,
    height: '100%',
  },
  divider: {
    width: theme.spacing / 2,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
})
