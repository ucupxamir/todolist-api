const { Op } = require('sequelize')
const { Task } = require('../src/models')

exports.delete_task = async () => {
    await Task.destroy({
        where: {
            title: {
                [Op.or]: ['test', 'test update']
            }
        }
    })
}

exports.create_task = async () => {
    const data = await Task.create({
        title: 'test',
        description: 'test',
        status: 'pending'
    })
    return data
}