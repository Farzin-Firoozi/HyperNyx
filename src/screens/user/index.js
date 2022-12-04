import React from 'react'

import { useQuery } from '@apollo/client'
import { useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import theme from '~/theme'
import Header from '~/components/header'
import Spinner from '~/components/spinner'
import { GET_ME_QUERY } from '~/graphql/queries'

const UserScreen = () => {
  const { params } = useRoute()

  const { accessToken } = params

  const { loading, data } = useQuery(GET_ME_QUERY, {
    context: { headers: { Authorization: `Bearer ${accessToken}` } },
    onError: (e) => {
      console.log(e.networkError.result)
    },
  })

  return (
    <View style={styles.root}>
      <Header left="back" />

      {loading ? (
        <Spinner />
      ) : (
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome {data?.me.id}</Text>
            <Text style={styles.description}>
              your account created at{' '}
              {new Date(data.me.createdAt).toLocaleDateString('en-US')}
            </Text>
          </View>
        </>
      )}
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing,
    alignItems: 'center',
    justifyContent: 'center',
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
})
