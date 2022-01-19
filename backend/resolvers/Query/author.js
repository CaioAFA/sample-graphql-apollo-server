const db = require('../../config/db')
const { getAuthorByFilter } = require('../common/author')

module.exports = {
  // Query "authors"
  async authors(_, __, ctx){
    ctx && ctx.validateUserIsLogged()

    return await db('author')
  },

  // Query "author"
  author(_, { filter }, ctx){
    ctx && ctx.validateUserIsLogged()

    return getAuthorByFilter(filter)
  }
}