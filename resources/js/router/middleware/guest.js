export default function guest ({ next, store }) {
  if (store.state.auth.isAuthenticated) {
    return next({
      name: 'dashboard'
    })
  }
  return next()
}
