export default function ({ route, store, redirect }) {
  if(route.path == '/login') return

  if (!store.state.user.data){
    return redirect('/login')
  }
}