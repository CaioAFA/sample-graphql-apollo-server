
exports.up = function(knex, Promise) {
  return knex.schema.createTable('music_author', table => {
      table.integer('music_id').unsigned()
      table.integer('author_id').unsigned()
      table.foreign('music_id').references('music.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.foreign('author_id').references('author.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.primary(['music_id', 'author_id'])
  }).then(function(){
    return knex('music_author').insert([
      // Despacito - Luis Fonsi, Daddy Yankee, Erika Ender
      { music_id: 1, author_id: 1 },
      { music_id: 1, author_id: 2 },
      { music_id: 1, author_id: 3 },

      // Boomerang Blues - Renato Russo
      { music_id: 2, author_id: 4 },

      // Is This Love - Bob Marley
      { music_id: 3, author_id: 5 },

      // Take On Me - Magne Furuholmen, Morten Harket, Paul Waaktaar-Savoy
      { music_id: 4, author_id: 6 },
      { music_id: 4, author_id: 7 },
      { music_id: 4, author_id: 8 },

      // Sampa - Caetano Veloso
      { music_id: 5, author_id: 9 },
    ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('music_author')
};
