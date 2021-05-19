export default function auth ({ next, store }) {
  if (!store.state.auth.isAuthenticated) {
    return next({
      name: 'auth'
    })
  }
  return next()
}
