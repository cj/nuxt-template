const { resolve } = require('path')
const { copySync } = require('fs-extra')
const yarnInstall = require('yarn-install')

module.exports = {
  helpers: {
    raw (options) {
      return options.fn(this)
    }
  },

  prompts: {
    name: {
      'type': 'string',
      'required': true,
      'message': 'Project name'
    },
    description: {
      'type': 'string',
      'required': false,
      'message': 'Project description',
      'default': 'Nuxt.js project'
    },
    author: {
      'type': 'string',
      'message': 'Author'
    },
  },

  completeMessage: '{{#inPlace}}To get started:\n\n yarn dev{{else}}To get started:\n\n  cd {{destDirName}}\n yarn dev{{/inPlace}}',

  complete ({ inPlace, destDirName }) {
    let path = resolve('./')

    if (!inPlace) {
      path = `${path}/${destDirName}`
    }

    copySync(`${path}/.env.example`, `${path}/.env`)

    console.log('\n')

    yarnInstall({ cwd: path })

    console.log('\n')
    console.log(`To get started: ${!inPlace ? `cd ${destDirName} &&` : ''} yarn dev`)
  }
};
