import { type HttpRequest, type Controller, type EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { type AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): any {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
      if (!httpRequest.body[field]) { // eslint-disable-line
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isvalid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        name,
        password,
        email
      })
    } catch (error) {
      return serverError()
    }
  }
}
