import { FieldValidationSpy } from '~/validation/test'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'
// import { ValidationBuilder } from '../builder/validation-builder'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationsSpy)
  // const sut = ValidationComposite.build([
  //   ...ValidationBuilder.field('email').required().email().build(),
  //   ...ValidationBuilder.field('password').required().min(3).build()
  // ])
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('✅ ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const [firstError, secondError] = fieldValidationsSpy
    const errorMessage = faker.random.words()
    firstError.error = new Error(errorMessage)
    secondError.error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if any validation pass', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
