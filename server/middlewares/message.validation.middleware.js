const {
    message
} = require('../models/message');
const {
    checkOnExtraParam,
    checkRequiredParam,
    checkOnParamType
} = require('../helpers/validation.helper')

const messageValidation = (messageData, allParams) => {
    if (!checkOnExtraParam(messageData, allParams)) {
        return {
            status: 400,
            message: 'Check message on extra credentials'
        }
    }
    if (!checkOnParamType(messageData, allParams)) {
        return {
            status: 400,
            message: 'Invalid type of value'
        }
    }
    return {
        status: 200
    }
}
const createMessageValid = (req, res, next) => {
    const messageData = req.body;
    try {
        if (!checkRequiredParam(message, messageData)) {
            throw ({
                status: 400,
                message: 'Check message on missing credentials'
            })
        }
        const validationErrors = messageValidation(messageData, message)
        if (validationErrors.status !== 200) {
            throw (validationErrors)
        }
        next()
    } catch (err) {
        return res.status(err.status)
            .json({
                error: true,
                message: err.message,
            });
    }
}

const updateMessageValid = (req, res, next) => {
    const messageData = req.body;
    try {
        const validationErrors = messageValidation(messageData, message);
        if (validationErrors.status !== 200) {
            throw (validationErrors)
        }
        next()
    } catch (err) {
        return res.status(err.status)
            .json({
                error: true,
                message: err.message,
            });
    }
}

exports.createMessageValid = createMessageValid;
exports.updateMessageValid = updateMessageValid;