const pick = require("../utils/pick")
const Joi = require('joi');

const validate = (schema) => (request, response, next) => {

    const object = pick(request, Object.keys(schema));

    const { error, value } = Joi.compile(schema)
        .prefs({
            abortEarly: false
        })
        .validate(object);


    if (error) {
        console.log(error.details.message)
        let message = error.details.map((value) => value.message).join(",");
        console.log(message);

        return res.status(400).json({
            success: false,
            message: message
        });
    }

    Object.assign(request, value);

    return next();

}

module.exports = validate;