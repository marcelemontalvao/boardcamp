import joi from "joi";

export const rentalsSchemma = joi.object({
  customerId: joi.number().required(),
  daysRented: joi.number().min(0).invalid(0).required(),
  gameId: joi.number().integer().min(1).required(),
});
