import joi from 'joi'

export const customersSchema = joi.object({
    cpf: joi.string().min(11).max(11).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    ).required(),
    phone: joi.string().min(10).max(11).required(),
    name: joi.string().min(2).required(),
    birthday: joi.date().required()
});

export default customersSchema;