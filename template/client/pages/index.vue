<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        nuxt-template
      </h1>
      <h2 class="subtitle">
        Nuxt.js project - {{ examplePublicKey }}
      </h2>
      <p></p>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
  },

  data () {
    return {
      examplePublicKey: process.env.EXAMPLE_PUBLIC_ENV,
    }
  },
}
</script>

<style lang='scss' scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: px(100);
  color: color(secondary, base);
  letter-spacing: px(1);
}

.subtitle {
  font-weight: 300;
  font-size: px(42);
  color: color(tertiary, base);
  word-spacing: px(5);
  padding-bottom: px(15);
}

.links {
  padding-top: px(15);
}
</style>
