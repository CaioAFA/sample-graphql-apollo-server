const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getLoggedUser, getUserByFilter } = require('../common/user')

module.exports = {
    // Query "users"
    users(){
        // We can return a Promise
        return db('user')
    },

    // Query "user"
    user(_, { filter }, ctx){
        ctx && ctx.validateUserFilter(filter)
        
        return getUserByFilter(filter)
    },

    // Query "login"
    async login(_, { data }){
        const user = await db('user')
            .where({ login: data.login })
            .first()

        if(!user){
            throw new Error('User / password invalid')
        }

        const authenticated = bcrypt.compareSync(data.password, user.password)

        if(!authenticated){
            throw new Error('User / password invalid')
        }

        return getLoggedUser(user)
    },
}