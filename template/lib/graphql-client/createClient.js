const { SubscriptionClient, addGraphQLSubscriptions } = require('subscriptions-transport-ws')
const { ApolloClient, createBatchingNetworkInterface } = require('apollo-client')

function createClient ({ url, subscriptionUrl, middleware, shouldBatch = true }) {
  let networkInterface = createBatchingNetworkInterface({
    uri: url,
  })

  if (subscriptionUrl) {
    const wsClient = new SubscriptionClient(
      subscriptionUrl,
      {
        reconnect: true,
        timeout: 20000,
      },
    )

    networkInterface = addGraphQLSubscriptions(
      networkInterface,
      wsClient,
    )
  }

  if (middleware) {
    networkInterface.use(middleware.map(mware => {
      return { applyBatchMiddleware: mware }
    }))
  }

  return new ApolloClient({
    networkInterface,
    dataIdFromObject: o => o.id,
    shouldBatch,
  })
}
exports.createClient =  createClient
exports = module.exports = createClient
