const UserService = require('./userService');
const { createToken } = require('../helpers/token.helper');

class AuthService {
    login(userData) {
        const {email, user, login, role, id, avatar} = UserService.search(userData);
        if(!user) {
            return null;
        }
        return {email, user, login, role, id, avatar, token: createToken({id})};
    }
}

module.exports = new AuthService();