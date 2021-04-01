import React from 'react'
import { makeRemoteAuthentication } from '~/main/factories/usecases/authentications/remote-authentication-factory'
import { Login } from '~/presentation/pages'
import { makeLoginValdiation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValdiation()}
    />
  )
}
