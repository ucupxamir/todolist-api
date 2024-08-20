const router = require('express').Router()
const taskService = require('../service/task.service')

router.post('/', async (req, res, next) => {
    try {
        const task = await taskService.create(req.body)

        res.status(200).send({
            message: 'Task created successfully',
            task
        })
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const tasks = await taskService.findAll()

        res.status(200).send(tasks)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const task = await taskService.findByPk(req.params.id)

        res.status(200).send(task)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const task = await taskService.update(req.body, req.params.id)

        res.status(200).send({
            message: 'Task updated successfully',
            task
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await taskService.destroy(req.params.id)

        res.status(200).send({
            message: 'Task deleted successfully'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router