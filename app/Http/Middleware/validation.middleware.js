function validationMiddleware(schema) {
    return async (
        req,
        res,
        next
    ) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (e) {
            const errors = [];
            e.details.forEach((error) => {
                errors.push(error.message);
            });

            res.status(422).send({
                'errorCode': 'VALIDATION_ERROR',
                errors: errors
            });
        }
    };
}

module.exports = validationMiddleware ;
