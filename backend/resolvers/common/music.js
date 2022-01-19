const db = require('../../config/db')

module.exports = {
  async getMusicByFilter(musicFilter){
    const { id } = musicFilter

    if(id){
      return await db('music').where({ id }).first()
    }
    
    return null
  }
}