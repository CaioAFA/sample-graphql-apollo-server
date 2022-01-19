const db = require('../../config/db')

module.exports = {
  // Get the Authors from the music
  authors(music) {
    return db('author')
      .join(
        'music_author',
        'author.id',
        'music_author.author_id'
      )
      .where({ music_id: music.id })
  }
}