const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { getUserByFilter } = require('../common/user')

const mutations = {
  // Mutation "createUser"
  async createUser(_, { data }, ctx){
    ctx && ctx.validateIsAdmin()

    try{
      // Password encryptation
      const salt = bcrypt.genSaltSync()
      data.password = bcrypt.hashSync(data.password, salt)

      const insertedId = await db('user').insert(data)
      data.id = parseInt(insertedId)
      return data
    }
    catch(e){
      console.log(e)
      throw new Error('Error at creating user. Check logs.')
    }
  },

  // Mutation "deleteUser"
  async deleteUser(_, { filter }, ctx){
    ctx && ctx.validateUserFilter(filter)

    try{
      const user = await getUserByFilter(filter)
      
      if(!user){
        return null
      }
      
      await db('user').where({ id: user.id }).delete()
      return user
    }
    catch(e){
      console.log(e)
      throw new Error('Error at deleting user. Check logs.')
    }
  },

  // Mutation "updateUser"
  async updateUser(_, { filter, data }, ctx){
    ctx && ctx.validateUserFilter(filter)

    let user
    try{
      user = await getUserByFilter(filter)
    }
    catch(e){
      console.log(e)
      throw new Error('Error at updating user. Check logs.')
    }

    if(!user) throw new Error('No user found')

    // Need admin privileges to change "is_admin" field
    if(data.is_admin != undefined && data.is_admin != user.is_admin){
      ctx.validateIsAdmin()
    }

    // Password encryptation
    if(data.password){
      const salt = bcrypt.genSaltSync()
      data.password = bcrypt.hashSync(data.password, salt)
    }
    
    user = {...user, ...data}

    try{
      await db('user').update(user).where({ id: user.id })
    }
    catch(e){
      console.log(e)
      throw new Error('Error at updating user. Check logs.')
    }

    return user
  }
}

module.exports = mutations