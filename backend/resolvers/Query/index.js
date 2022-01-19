const user = require('./user')
const author = require('./author')
const music = require('./music')

module.exports = {
    ...user,
    ...author,
    ...music
}