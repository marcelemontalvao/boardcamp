import joi from 'joi'

export const customersSchema = joi.object({
    cpf: joi.string().length(11).regex(/^[0-9]+$/).required(),
    phone: joi.string().min(10).max(11).required(),
    name: joi.string().min(2).required(),
    birthday: joi.date().required()
});

export default customersSchema;