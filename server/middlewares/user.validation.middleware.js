const {
    user
} = require('../models/user');
const {
    checkOnExtraParam,
    checkRequiredParam,
    checkOnParamType
} = require('../helpers/validation.helper')
const phoneNumberRegex = new RegExp(/^[0-9]{9}$/)

const userValidation = (userData, allParams) => {
    const {
        email,
        password
    } = userData
    if (!checkOnExtraParam(userData, allParams)) {
        return {
            status: 400,
            message: 'Check user on extra credentials'
        }
    }
    if (!checkOnParamType(userData, allParams)) {
        return {
            status: 400,
            message: 'Invalid type of value'
        }
    }
    if (email && email.indexOf("@gmail.com") <= 0) {
        return {
            status: 400,
            message: 'Add valid email with pattern gmail'
        }
    }

    if (password && password.length < 3) {
        return {
            status: 400,
            message: 'Password must include more than 3 symbols'
        }
    }
    return {
        status: 200
    }
}
const createUserValid = (req, res, next) => {
    const userData = req.body;
    try {
        if (!checkRequiredParam(user, userData)) {
            throw ({
                status: 400,
                message: 'Check user on missing credentials'
            })
        }
        const validationErrors = userValidation(userData, user)
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

const updateUserValid = (req, res, next) => {
    const userData = req.body;
    try {
        const validationErrors = userValidation(userData, user);
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

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;