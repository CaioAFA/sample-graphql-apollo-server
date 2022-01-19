const jwt = require('jwt-simple')
const db = require('../../config/db')

module.exports = {
  async getLoggedUser(user){
    const now = Math.floor(Date.now() / 1000)
    
    // JWT token data
    const userInfo = {
      id: user.id,
      login: user.login,
      is_admin: user.is_admin,
      iat: now, // Token created time
      exp: now + (3 * 24 * 60 * 60) // Expiration date: now + 3 day
    }

    // APP_AUTH_SECRET on the .env file
    const authSecret = process.env.APP_AUTH_SECRET

    return {
      ...userInfo,
      token: jwt.encode(userInfo, authSecret)
    }
  },

  async getUserByFilter(userFilter){
    const { id, login } = userFilter

    if(id){
      return await db('user').where({ id }).first()
    }
    
    if(login){
      return await db('user').where({ login }).first()
    }

    return null
  }
}