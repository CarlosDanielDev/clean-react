import { ValidationComposite } from '~/validation/validators'
import { ValidationBuilder } from '~/validation/validators/builder/validation-builder'
import { makeLoginValdiation } from './login-validation-factory'

describe('LoginValdiationFactory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValdiation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(6).build()
    ]))
  })
})
