
exports.up = function (knex, Promise) {
  return knex.schema.createTable('music', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('year', 4)
    table.string('genre')
    table.string('singer')
  }).then(function () {
    return knex('music').insert([
      { id: 1, name: 'Despacito', year: 2017, genre: 'reggaeton', singer: 'Luis Fonsi' },
      { id: 2, name: 'Boomerang Blues', year: 2003, genre: 'rock', singer: 'Renato Russo' },
      { id: 3, name: 'Is This Love', year: 1978, genre: 'reggae', singer: 'Bob Marley' },
      { id: 4, name: 'Take On Me', year: 1985, genre: 'pop', singer: 'A-ha' },
      { id: 5, name: 'Sampa', year: 1978, genre: 'mpb', singer: 'Caetano Veloso' },
    ])
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('music')
};
