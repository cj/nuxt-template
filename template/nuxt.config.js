import * as modules from './client/modules'

export default {
  srcDir: 'client/',

  modules: [...Object.values(modules)],

  dotenv: {
    envs: ['EXAMPLE_PUBLIC_ENV'],
  },

  head: {
    title: 'nuxt-template',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  loading: { color: '#3B8070' },

  // global css
  css: ['normalize.css', '~/assets/sass/main.scss'],

  // These will get added to every scss file, including .vue files
  resources: [
    'client/assets/sass/_variables.scss',
    'client/assets/sass/_mixins.scss',
  ],

  build: {
    srcDir: 'client/',

    babel: {
      presets: ['vue-app'],
      plugins: ['transform-class-properties'],
    },

    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%'],
      }),
    ],
  },
}
