import { makeAxiosHttpClient, makeApiUrlFactory } from '~/main/factories/http'
import { RemoteAuthentication } from '~/data/usecases/authentication/remote-authentication'
import { Authentication } from '~/domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrlFactory('/login'), makeAxiosHttpClient())
}
