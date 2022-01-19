const db = require('../../config/db')

module.exports = {
  // Get the musics from the Author
  musics(author) {
    return db('music')
      .join(
        'music_author',
        'music.id',
        'music_author.music_id'
      )
      .where({ author_id: author.id })
  }
}