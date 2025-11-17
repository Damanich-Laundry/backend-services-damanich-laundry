class ValidationService {
    validateSchema(schema, data) {
        return schema.validate(data, {abortEarly: false});
    }
}

module.exports = new ValidationService();
