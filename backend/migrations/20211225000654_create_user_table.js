
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary()
    table.string('login').notNull().unique()
    table.string('password', 60).notNull()
    table.boolean('is_admin').notNull().defaultTo(true)
  }).then(function () {
    return knex('user').insert([
      // Login: 'admin' - Password: 'admin'
      { login: 'admin', password: '$2a$10$GdYdOUBG59umkRQtUY1POu7TgOIsWSituDQPygfqrw2AlsbijA9vm', is_admin: true },

      // Login: 'user' - Password: 'user'
      { login: 'user', password: '$2a$10$K/wRSnE67rhH5M6Ms79HeeESFSlG7Ye5KN33Mux9KZV6u2i2mgJYi', is_admin: false },
    ])
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user')
};
