const Joi = require('joi')

const validator = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),

    id: Joi.number().optional(),
    gender: Joi.string().optional(),
    age: Joi.number().optional(),
    occupation: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
    interests: Joi.array().items(Joi.string()).optional(),
  })

  return schema.validate(body)
}

module.exports = validator
