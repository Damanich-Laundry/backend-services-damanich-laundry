function successResponse(res, message = "Success", data = null, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        errors: null,
    });
}

function errorResponse(res, error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
        data: null,
        errors: error.details || null,
    });
}

module.exports = {
    successResponse,
    errorResponse,
};
