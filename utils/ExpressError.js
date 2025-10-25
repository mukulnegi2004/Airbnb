// Custom error class for the application, Extends the built-in Error class and allows setting a status code along with the error message
// This makes it easier to throw consistent errors that can be handled by a custom error handler
class ExpressError extends Error {
    constructor( statusCode, message) {
      super();                                           // Call the parent Error constructor
      this.message = message; 
      this.statusCode = statusCode;
    }
}
  
module.exports = ExpressError;