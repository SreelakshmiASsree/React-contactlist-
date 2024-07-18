const joi = require("joi");
const authSchema = joi.object({
    salutation:joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().lowercase().required(),
    phone: joi.number().integer().required(),
    place: joi.string().required()
})
module.exports = authSchema;