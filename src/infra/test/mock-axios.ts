import axios from 'axios'
import faker from 'faker'

type MockHttpResponseProps = {
  data: string
  status: number
}

export const mockHttpResponse = (): MockHttpResponseProps => ({
  data: faker.random.objectElement(),
  status: faker.random.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
