const jwt = require('jwt-simple')
const {
  shouldSimulateLoggedAdminUser,
  shouldSimulateLoggedUser,
  simulateLoggedUser
} = require('./simulateLoggedUser')

module.exports = async ({ req }) => {
  // Development only - simulate logged user
  if(shouldSimulateLoggedAdminUser()){
    await simulateLoggedUser('admin', req)
  }
  else if(shouldSimulateLoggedUser()){
    await simulateLoggedUser('user', req)
  }

  const auth = req.headers.authorization
  const token = auth && auth.substring(7) // Get the token after "Bearer "

  let user = null
  let admin = false

  if(token){
    try{
      let tokenContent = jwt.decode(token, process.env.APP_AUTH_SECRET)

      // Validate expiration date
      if(new Date(tokenContent.exp * 1000) > new Date()){
        user = tokenContent
      }
      else{
        throw new Error('Token expired')
      }
    }
    catch(e){
      throw new Error(e.message)
    }
  }

  if(user){
    admin = user.is_admin
  }

  // This error will be executed when necessary
  const err = new Error('Forbidden')

  return {
    user,
    admin,
    validateUserIsLogged(){
      if(!user) throw err
    },
    validateIsAdmin(){
      if(!admin) throw err
    },

    // Only admins can update / delete any user
    // As a normal user, we can update / delete only our own data
    validateUserFilter(userFilter){
      if(admin) return

      if(!user) throw err // No user logged in
      if(!userFilter) throw new Error('Please specify a valid filter')

      const { id, login } = userFilter
      if(!id && !login) throw new Error('Please specify a valid filter')

      if(id && id !== user.id) throw err // Trying to update / delete other user
      if(login && login !== user.login) throw err
    },
  }
}