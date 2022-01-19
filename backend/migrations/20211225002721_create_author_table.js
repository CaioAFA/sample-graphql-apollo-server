
exports.up = function (knex, Promise) {
  return knex.schema.createTable('author', table => {
    table.increments('id').primary()
    table.string('name').notNull().unique()
    table.string('born_country', 25)
  }).then(function () {
    return knex('author').insert([
      // Despacito authors
      { id: 1, name: 'Luis Fonsi', born_country: 'Porto Rico' },
      { id: 2, name: 'Daddy Yankee', born_country: 'Porto Rico' },
      { id: 3, name: 'Erika Ender', born_country: 'Panamá' },

      // Boomerang Blues authors
      { id: 4, name: 'Renato Russo', born_country: 'Brasil' },

      // Is This Love authors
      { id: 5, name: 'Bob Marley', born_country: 'Jamaica' },

      // Take On Me authors
      { id: 6, name: 'Magne Furuholmen', born_country: 'Noruega' },
      { id: 7, name: 'Morten Harket', born_country: 'Noruega' },
      { id: 8, name: 'Paul Waaktaar-Savoy', born_country: 'Noruega' },

      // Sampa authors
      { id: 9, name: 'Caetano Veloso', born_country: 'Brasil' },
    ])
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('author')
};
