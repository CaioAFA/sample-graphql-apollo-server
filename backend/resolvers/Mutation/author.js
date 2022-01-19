const db = require('../../config/db')
const { getAuthorByFilter } = require('../common/author')

const mutations = {
  // Mutation "createAuthor"
  async createAuthor(_, { data }, ctx){
    ctx && ctx.validateIsAdmin()

    const trx = await db.transaction()

    try{
      const { musics_ids } = data
      delete data.musics_ids

      const insertedId = await db('author').transacting(trx).insert(data)
      data.id = parseInt(insertedId)

      const insertMusicsIdsData = []
      if(musics_ids && musics_ids.length){
        for(let i = 0; i < musics_ids.length; i++){
          insertMusicsIdsData.push({
            music_id: musics_ids[i],
            author_id: insertedId
          })
        }

        await db('music_author').transacting(trx).insert(insertMusicsIdsData)
      }
      
      trx.commit()

      return data
    }
    catch(e){
      console.log(e)
      trx.rollback()
      throw new Error('Error at creating author. Check logs.')
    }
  },

  // Mutation "deleteAuthor"
  async deleteAuthor(_, { filter }, ctx){
    ctx && ctx.validateIsAdmin()

    try{
      const author = await getAuthorByFilter(filter)

      if(!author){
        return null
      }
      
      await db('author').where({ id: author.id }).delete()
      return author
    }
    catch(e){
      console.log(e)
      throw new Error('Error at deleting author. Check logs.')
    }
  },

  // Mutation "updateAuthor"
  async updateAuthor(_, { filter, data }, ctx){
    ctx && ctx.validateIsAdmin()

    const trx = await db.transaction()
    
    try {
      let author = await getAuthorByFilter(filter)
      if(!author) return
      
      const { musics_ids } = data
      delete data.musics_ids

      const updateMusicsIdsData = []
      if(musics_ids){
        await db('music_author').transacting(trx).delete().where({
          author_id: author.id
        })

        for(let i = 0; i < musics_ids.length; i++){
          updateMusicsIdsData.push({
            music_id: musics_ids[i],
            author_id: author.id
          })
        }

        await db('music_author').transacting(trx).insert(updateMusicsIdsData)
      }

      author = {...author, ...data}
      await db('author').transacting(trx).update(data).where({ id: author.id })

      trx.commit()

      return author
    }
    catch(e){
      console.log(e)
      trx.rollback()
      throw new Error('Error at editing author. Check logs.')
    }
  }
}

module.exports = mutations