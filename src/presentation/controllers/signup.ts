import { type HttpRequest } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { type Controller } from '../protocols/controller'
import { type EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): any {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
      if (!httpRequest.body[field]) { // eslint-disable-line
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isvalid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
