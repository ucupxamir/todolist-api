const ErrorResponse = require('./response.error')

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next()
        return
    }

    if (err instanceof ErrorResponse) {
        res.status(err.status).send({
            errors: err.message.replace(/\"/g, '').split('. ')
        }).end()
    } else {
        console.error(err)
        res.status(500).send({
            errors: ['internal server error']
        }).end()
    }
}

module.exports = errorMiddleware