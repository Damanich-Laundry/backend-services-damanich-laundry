const {AppError} = require("../exceptions/errors");

function errorMiddleware(err, req, res, next) {
console.log("KENA")
    if (!(err instanceof AppError)) {
        console.error(err); // log error internal
        err = new AppError("Internal Server Error", 500);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        data: null,
        errors: err.details || null,
    });
}

module.exports = errorMiddleware;
