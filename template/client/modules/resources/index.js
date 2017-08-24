import { resolve } from 'path'

export function resources (moduleOptions = []) {
  const resources = [...this.options.resources, ...moduleOptions].map(resource => {
    return typeof resource === 'string' ? resolve(resource) : resource
  })

  const isVueRule = rule => {
    return rule.test.toString() === '/\\.vue$/'
  }

  const isSassRule = rule => {
    return ['/\\.scss$/'].indexOf(rule.test.toString()) !== -1
  }

  const resourcesLoader = {
    // this workers with any pre-processor, including sass
    loader: 'sass-resources-loader',
    options: { resources },
  }

  this.extendBuild((config, ctx) => {
    config.module.rules.forEach(rule => {
      if (isVueRule(rule)) {
        rule.options.loaders.scss.push(resourcesLoader)
      }

      if (isSassRule(rule)) {
        rule.use.push(resourcesLoader)
      }
    })
  })
}

export default resources
