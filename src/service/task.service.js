const { Task, sequelize } = require('../models')
const validate = require('../validation/validate')
const taskValidation = require('../validation/task.validation')
const ResponseError = require('../error/response.error')

exports.create = async (request) => {
    const taskRequest = validate(taskValidation.CREATE, request) 

    return Task.create(taskRequest)
}

exports.findAll = async () => {
    return Task.findAll()
}

exports.findByPk = async (request_id) => {
    const id = validate(taskValidation.ID, request_id)

    const task = await Task.findByPk(id)

    if (!task) throw new ResponseError(404, 'task was not found')

    return task
}

exports.update = async (request, request_id) => {
    let t = await sequelize.transaction()
    try {
        const id = validate(taskValidation.ID, request_id)

        const taskRequest = validate(taskValidation.UPDATE, request)

        const task = await Task.findByPk(id, { transaction: t })

        if (!task) throw new ResponseError(404, 'task was not found')

        await Task.update(taskRequest, {
            where: { id },
            returning: true
        }, { transaction: t })

        const updatedTask = await Task.findByPk(id, { transaction: t })

        await t.commit()

        return updatedTask
    } catch (error ) {
        await t.rollback()
        throw error
    }
}

exports.destroy = async (request_id) => {
    let t = await sequelize.transaction()
    try {
        const id = validate(taskValidation.ID, request_id)

        const task = await Task.findByPk(id, { transaction: t })

        if (!task) throw new ResponseError(404, 'task was not found')

        await Task.destroy({
            where: { id }
        }, { transaction: t })

        await t.commit()

        return true
    } catch (error ) {
        await t.rollback()
        throw error
    }
}