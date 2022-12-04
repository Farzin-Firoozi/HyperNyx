import { gql } from '@apollo/client'

export const PASSWORD_LESS_LOGIN_MUTATION = gql`
  mutation startPasswordLessLogin($phoneNumber: String!) {
    startPasswordLessLogin(ClientType: Client, phoneNumber: $phoneNumber)
  }
`

export const LOGIN_WITH_CODE_MUTATION = gql`
  mutation loginWithCode($code: Int!) {
    loginWithCode(code: $code) {
      accessToken
    }
  }
`
