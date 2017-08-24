const { resolve } = require('path')
const copyFileSync = require('./copy-file-sync')

module.exports = {
  helpers: {
    raw (options) {
      return options.fn(this)
    },
  },

  prompts: {
    name: {
      'type': 'string',
      'required': true,
      'message': 'Project name',
    },
    description: {
      'type': 'string',
      'required': false,
      'message': 'Project description',
      'default': 'Nuxt.js project',
    },
    author: {
      'type': 'string',
      'message': 'Author',
    },
  },

  completeMessage: '{{#inPlace}}To get started:\n\n yarn && yarn dev{{else}}To get started:\n\n  cd {{destDirName}}\n && yarn && yarn dev{{/inPlace}}',

  complete ({ inPlace, destDirName }) {
    let path = resolve('./')

    if (!inPlace) {
      path = `${path}/${destDirName}`
    }

    copyFileSync(`${path}/.env.example`, `${path}/.env`)
  },
}
