module.exports = function vuex (action, method, variables) {
  const { $store } = global.$nuxt || {}

  if (!$store) return

  switch (action) {
    case 'dispatch':
    case 'commit':
      return $store[action](method, variables)
    default:
      if (variables) {
        return $store[action][method](variables)
      } else {
        return $store[action][method]
      }
  }
}
