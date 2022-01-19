export default async ({ $graphql, store }) => {
  const loggedUser = localStorage.getItem('loggedUser');

  if(loggedUser){
    const user = JSON.parse(loggedUser)

    $graphql.default.setHeaders({ authorization: `Bearer ${user.token}` });
    store.commit('user/setData', user)
  }
}