const Joi = require('joi')

exports.CREATE = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'completed').required()
})

exports.UPDATE = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('pending', 'completed')
})

exports.ID = Joi.number().label('id').required()