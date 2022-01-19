const db = require('../../config/db')

module.exports = {
  async getAuthorByFilter(authorFilter){
    const { id, name } = authorFilter

    if(id){
      return await db('author').where({ id }).first()
    }
    
    if(name){
      return await db('author').where({ name }).first()
    }

    return null
  }
}