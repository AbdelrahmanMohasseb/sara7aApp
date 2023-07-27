const Joi = require('joi');
// user validation schema 
const userSchemaValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.ref('password'),
        userName: Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z]{3,30}$'))
    })
}

module.exports = userSchemaValidation;