import StyleLintPlugin from 'stylelint-webpack-plugin'

export function lint (moduleOptions) {
  this.extendBuild((config, ctx) => {
    if (ctx.dev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      })

      config.plugins.push(new StyleLintPlugin())
    }
  })
}
