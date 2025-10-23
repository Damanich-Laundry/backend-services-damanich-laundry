// utils/general.js
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

module.exports = {handleJoiErrorMessage};
