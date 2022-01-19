const db = require('./db')
const { getLoggedUser } = require('../resolvers/common/user')

const sql = `
  SELECT
    u.*
  FROM
    user u
  WHERE
    u.login = :userLogin
  LIMIT 1
`

const getUser = async userLogin => {
  const res = await db.raw(sql, { userLogin })
  return res ? res[0][0] : null
}

module.exports = {
  simulateLoggedUser: async (userLogin, req) => {
    const user = await getUser(userLogin)
  
    if(user){
      const { token } = await getLoggedUser(user)
      req.headers = {
        authorization: `Bearer ${token}`
      }
    }
  },

  shouldSimulateLoggedAdminUser: () => {
    return process.argv.includes('simulateAdminUser')
  },

  shouldSimulateLoggedUser: () => {
    return process.argv.includes('simulateUser')
  }
}