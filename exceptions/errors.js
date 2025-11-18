class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

/* ============================
   400 – VALIDATION
============================ */
class ValidationError extends AppError {
    constructor(joiError) {
        const details = joiError?.details?.map((d) => ({
            field: d.path.join("."),
            message: d.message.replace(/"/g, ""), // gunakan err, bukan d
        })) || null;

        super("Validation failed", 400, details);
    }
}

/* ============================
   401 – AUTH ERROR
============================ */
class AuthenticationError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

/* ============================
   403 – FORBIDDEN
============================ */
class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

/* ============================
   404 – NOT FOUND
============================ */
class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

/* ============================
   409 – UNIQUE CONSTRAINT
============================ */
class UniqueConstraintError extends AppError {
    constructor(sequelizeError) {
        const details = sequelizeError.errors?.map((err) => ({
            field: err.path,
            message: err.message,
        })) || null;

        super("Unique constraint violation", 409, details);
    }
}

/* ============================
   409 – FOREIGN KEY
============================ */
class ForeignKeyConstraintError extends AppError {
    constructor(sequelizeError) {
        const details = {
            table: sequelizeError.table,
            fields: sequelizeError.fields,
            message: sequelizeError.parent?.detail,
        };

        super("Foreign key constraint failed", 409, details);
    }
}

/* ============================
   400 – DATABASE VALIDATION ERROR
============================ */
class DatabaseValidationError extends AppError {
    constructor(sequelizeError) {
        const details = sequelizeError.errors?.map((err) => ({
            field: err.path,
            message: err.message,
        })) || null;

        super("Database validation error", 400, details);
    }
}

/* ============================
   500 – DATABASE ERROR
============================ */
class DatabaseError extends AppError {
    constructor(message = "Database error", details = null) {
        super(message, 500, details);
    }
}

/* ============================
   500 – INTERNAL SERVER ERROR
============================ */
class InternalError extends AppError {
    constructor(message = "Internal server error", details = null) {
        super(message, 500, details);
    }
}

module.exports = {
    AppError,
    ValidationError,
    AuthenticationError,
    ForbiddenError,
    NotFoundError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    DatabaseValidationError,
    DatabaseError,
    InternalError
};
