import GraphQLClient from '#/lib/graphql-client'

export default new GraphQLClient({
  clients: {
    default: {
      url: process.env.GRAPHQL_URL,
      subscriptionUrl: process.browser ? process.env.GRAPHQL_SUBSCRIPTIONS_URL : null,
      middleware: [function (req, next) {
        if (!req.options.headers) req.options.headers = {}
        if (req.session) {
          req.options.headers.authorization = `Bearer ${req.session.graphCoolToken}`
        }

        next()
      }],
    },
  },
})
