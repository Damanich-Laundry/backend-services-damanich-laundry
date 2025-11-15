class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

class ValidationError extends AppError {
    constructor(joiError) {
        const details = joiError.details.map((d) => ({
            field: d.path.join("."),
            message: d.message,
        }));
        super("Validation failed", 400, details);
    }
}

class AuthenticationError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

module.exports = {
    AppError,
    ValidationError,
    AuthenticationError,
    ForbiddenError,
    NotFoundError,
};
