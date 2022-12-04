import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import BackIcon from '~/assets/icons/back.svg'
import theme from '~/theme'
import { useNavigation } from '@react-navigation/native'

const Header = ({ left = undefined }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.root}>
      {left === 'back' && (
        <TouchableOpacity style={styles.icon} onPress={navigation.goBack}>
          <BackIcon width={18} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  root: {
    height: 48,
    paddingHorizontal: theme.spacing,
    alignItems: 'flex-start',
  },
  icon: {
    justifyContent: 'center',
  },
})
