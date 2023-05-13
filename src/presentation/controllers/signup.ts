
export class SignUpController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) { // eslint-disable-line
      return {
        statusCode: 400,
        body: new Error('Missing params: name')
      }
    }
    if (!httpRequest.body.email) { // eslint-disable-line
      return {
        statusCode: 400,
        body: new Error('Missing params: email')
      }
    }
  }
}
