const db = require('../../config/db')
const { getMusicByFilter } = require('../common/music')

module.exports = {
  // Query "musics"
  async musics(_, __, ctx){
    ctx && ctx.validateUserIsLogged()

    return await db('music')
  },

  // Query "music"
  music(_, { filter }, ctx){
    ctx && ctx.validateUserIsLogged()

    return getMusicByFilter(filter)
  }
}