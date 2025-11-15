// utils/general.js
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function handleJoiErrorMessage(joiError) {
  const messages = joiError.details.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  const errObj = new Error("Validation failed");
  errObj.statusCode = 400;
  errObj.details = messages;
  return errObj;
}

module.exports = { asyncHandler, handleJoiErrorMessage };
