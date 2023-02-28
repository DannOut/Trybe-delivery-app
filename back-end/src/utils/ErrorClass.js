module.exports = class ErrorClass extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ErrorClass.prototype);
  }
};
