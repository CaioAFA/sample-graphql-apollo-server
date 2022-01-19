const db = require('../../config/db')
const { getMusicByFilter } = require('../common/music')

const mutations = {
  // Mutation "createMusic"
  async createMusic(_, { data }, ctx){
    ctx && ctx.validateIsAdmin()

    const trx = await db.transaction()

    try{
      const { authors_ids } = data
      delete data.authors_ids

      const insertedId = await db('music').transacting(trx).insert(data)
      data.id = parseInt(insertedId)

      const insertAuthorsIdsData = []
      if(authors_ids){
        for(let i = 0; i < authors_ids.length; i++){
          insertAuthorsIdsData.push({
            music_id: insertedId,
            author_id: authors_ids[i]
          })
        }

        await db('music_author').transacting(trx).insert(insertAuthorsIdsData)
      }

      trx.commit()
      
      return data
    }
    catch(e){
      console.log(e)
      trx.rollback()
      throw new Error('Error at creating music. Check logs.')
    }
  },

  // Mutation "deleteMusic"
  async deleteMusic(_, { filter }, ctx){
    ctx && ctx.validateIsAdmin()

    try{
      const music = await getMusicByFilter(filter)

      if(!music){
        return null
      }
      
      await db('music').where({ id: music.id }).delete()
      return music
    }
    catch(e){
      console.log(e)
      throw new Error('Error at deleting music. Check logs.')
    }
  },

  // Mutation "updateMusic"
  async updateMusic(_, { filter, data }, ctx){
    ctx && ctx.validateIsAdmin()

    const trx = await db.transaction()

    try {
      let music = await getMusicByFilter(filter)

      if(!music) return
      
      const { authors_ids } = data
      delete data.authors_ids

      const updateAuthorsIdsData = []
      if(authors_ids){
        await db('music_author').transacting(trx).delete().where({
          music_id: music.id
        })

        for(let i = 0; i < authors_ids.length; i++){
          updateAuthorsIdsData.push({
            music_id: music.id,
            author_id: authors_ids[i]
          })
        }

        await db('music_author').transacting(trx).insert(updateAuthorsIdsData)
      }

      music = {...music, ...data}
      await db('music').transacting(trx).update(data).where({ id: music.id })

      trx.commit()
      return music
    }
    catch(e){
      console.log(e)
      trx.rollback()
      throw new Error('Error at editing music. Check logs.')
    }
  }
}

module.exports = mutations