import  query from './query'
import  mutate from './mutate'
import  subscribe from './subscribe'
import  createClient from './createClient'
import  vuex from './vuex'

export default class GraphQLClient {
  constructor (config) {
    this.config = config
    this.clients = Object.entries(config.clients).reduce((clients, [name, client]) => {
      clients[name] = createClient(client)
      return clients
    }, {})
  }

  query (...args) { return query.call(this, ...args) }
  mutate (...args) { return mutate.call(this, ...args) }
  subscribe (...args) { return subscribe.call(this, ...args) }
  vuex (...args) { return vuex.call(this, ...args) }
}
