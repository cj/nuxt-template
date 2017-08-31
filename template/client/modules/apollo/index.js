module.exports = function apollo (moduleOptions) {
  // Add vue-apollo and apollo-client in vendor
  this.addVendor(['apollo-client'])
  // Add graphql loader
  this.extendBuild((config, ctx) => {
    config.resolve.extensions = config.resolve.extensions.concat('.graphql', '.gql')

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      use: 'graphql-tag/loader',
    })

    return config
  })
}
