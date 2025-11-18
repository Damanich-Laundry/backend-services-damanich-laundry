const {ValidationError} = require("../exceptions/errors");

class ValidationService {
    validateSchema(schema, data) {
        let {error, value} = schema.validate(data, {abortEarly: false})
        if (error) {
            throw new ValidationError(error)
        }
        return value
    }
}

module.exports = new ValidationService();
