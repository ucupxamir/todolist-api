const supertest = require('supertest')
const web = require('../src/application/web')
const testUtils = require('./test.utils')

describe('POST /api/tasks', function () {
    afterEach(async () => {
        await testUtils.delete_task()
    })

    it('should reject create new task if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/tasks')
            .send({
                title: '',
                description: '',
                status: ''
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toHaveLength(4)
    })

    it('should reject create new task if status not valid', async () => {
        const result = await supertest(web)
            .post('/api/tasks')
            .send({
                title: 'test',
                description: 'test',
                status: 'test'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toHaveLength(1)
    })

    it('should success create new task', async () => {
        const result = await supertest(web)
            .post('/api/tasks')
            .send({
                title: 'test',
                description: 'test',
                status: 'pending'
            })

        expect(result.status).toBe(200)
        expect(result.body.message).toBe('Task created successfully')
        expect(result.body.task.title).toBe('test')
        expect(result.body.task.description).toBe('test')
        expect(result.body.task.status).toBe('pending')
    })
})

describe('GET /api/tasks', function () {
    afterEach(async () => {
        await testUtils.delete_task()
    })

    it('should success get all task', async () => {
        await testUtils.create_task()

        const result = await supertest(web)
            .get('/api/tasks')

        expect(result.status).toBe(200)
        expect(result.body).toHaveLength(1)
    })

})

describe('GET /api/tasks/{id}', function () {
    afterEach(async () => {
        await testUtils.delete_task()
    })

    it('should reject get task by id if id is invalid number', async () => {
        const result = await supertest(web)
            .get('/api/tasks/a')

        expect(result.status).toBe(400)
        expect(result.body.errors).toHaveLength(1)
        expect(result.body.errors[0]).toBe('id must be a number')
    })

    it('should reject get task by id if task was not found', async () => {
        const result = await supertest(web)
            .get('/api/tasks/1')

        expect(result.status).toBe(404)
        expect(result.body.errors).toHaveLength(1)
        expect(result.body.errors[0]).toBe('task was not found')
    })

    it('should reject get task by id if task was not found', async () => {
        const task = await testUtils.create_task()

        const result = await supertest(web)
            .get('/api/tasks/' + task.id)

        expect(result.status).toBe(200)
        expect(result.body.id).toBe(task.id)
        expect(result.body.title).toBe('test')
        expect(result.body.description).toBe('test')
        expect(result.body.status).toBe('pending')
    })

})

describe('PUT /api/tasks/{id}', function () {
    afterEach(async () => {
        await testUtils.delete_task()
    })

    it('should reject update task if id is invalid number', async () => {
        const result = await supertest(web)
            .put('/api/tasks/a')
            .send({
                title: 'test update',
                description: 'test update',
                status: 'completed'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toHaveLength(1)
        expect(result.body.errors[0]).toBe('id must be a number')
    })

    it('should reject update task if request is invalid', async () => {
        const result = await supertest(web)
            .put('/api/tasks/1')
            .send({
                title: '',
                description: '',
                status: ''
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toHaveLength(4)
    })

    it('should reject update task if task was not found', async () => {
        const result = await supertest(web)
            .put('/api/tasks/1')
            .send({
                title: 'test update',
                description: 'test update',
                status: 'completed'
            })

        expect(result.status).toBe(404)
        expect(result.body.errors).toHaveLength(1)
        expect(result.body.errors[0]).toBe('task was not found')
    })

    it('should success update task', async () => {
        const task = await testUtils.create_task()

        const result = await supertest(web)
            .put('/api/tasks/' + task.id)
            .send({
                title: 'test update',
                description: 'test update',
                status: 'completed'
            })

        expect(result.status).toBe(200)
        expect(result.body.message).toBe('Task updated successfully')
        expect(result.body.task.id).toBe(task.id)
        expect(result.body.task.title).toBe('test update')
        expect(result.body.task.description).toBe('test update')
        expect(result.body.task.status).toBe('completed')
    })
})

describe('DELETE /api/tasks', function () {
    afterEach(async () => {
        await testUtils.delete_task()
    })

    it('should reject delete task if id is invalid number', async () => {
        const result = await supertest(web)
            .delete('/api/tasks/a')
            .send({
                title: 'test update',
                description: 'test update',
                status: 'completed'
            })

        expect(result.status).toBe(400)
        expect(result.body.errors).toHaveLength(1)
        expect(result.body.errors[0]).toBe('id must be a number')
    })

    it('should reject delete task if task was not found', async () => {
        const result = await supertest(web)
            .delete('/api/tasks/1')

        expect(result.status).toBe(404)
        expect(result.body.errors).toHaveLength(1)
        expect(result.body.errors[0]).toBe('task was not found')
    })

    it('should success delete task', async () => {
        const task = await testUtils.create_task()

        const result = await supertest(web)
            .delete('/api/tasks/' + task.id)

        expect(result.status).toBe(200)
        expect(result.body.message).toBe('Task deleted successfully')
    })
})