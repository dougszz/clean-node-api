import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}
describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isvalid = sut.isvalid('invalid_email@mail.com')
    expect(isvalid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isvalid = sut.isvalid('valid_email@mail.com')
    expect(isvalid).toBe(true)
  })

  test('Should call validator with a correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isvalid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
