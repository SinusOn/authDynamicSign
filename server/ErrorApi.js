export default class ErrorApi extends Error {
  statusCode;
  error;
  constructor() {
    super(this.message);
    this.statusCode = statusCode;
  }
  static UnauthorizedError() {
    return new ErrorAPI(401, "Пользователь не авторизован");
  }
  static BadRequest() {
    return new ErrorAPI(400, message, errors);
  }
}
