import { FieldValidationSpy } from '~/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut()
    const [first_error, second_error] = fieldValidationsSpy
    first_error.error = new Error('first_error_message')
    second_error.error = new Error('second_error_message')
    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('first_error_message')
  })
})
