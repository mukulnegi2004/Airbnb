// wrapAsync is a helper function to wrap async route handlers, It automatically catches any errors and forwards them to our custom error-handling middleware, so you don't need to write try-catch blocks in every route.
const wrapAsync = (fn) => {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  };
  
module.exports = wrapAsync;