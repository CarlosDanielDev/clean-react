import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from '~/validation/errors'

describe('MinLengthValidation', () => {
  test('Should return error if values is invalid', () => {
    const sut = new MinLengthValidation('field', 5)

    const error = sut.validate('1234')

    expect(error).toEqual(new InvalidFieldError())
  })
})
