import GraphQLClient from '#/lib/graphql-client'

export default new GraphQLClient({
  clients: {
    default: {
      url: process.env.GRAPHQL_URL,
      middleware: [function (req, next) {
        if (!req.options.headers) req.options.headers = {}
        if (req.session) {
          req.options.headers.authorization = `Bearer ${process.env.GRAPHCOOL_SERVER_TOKEN}`
        }

        next()
      }],
    },
  },
})
