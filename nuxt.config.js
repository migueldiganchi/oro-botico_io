require("dotenv").config();

const { API_BASE_URL } = process.env;

import colors from "vuetify/es5/util/colors";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#b89646", height: "4.5px" },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "%s - " + "Directorio Virtual de Traders",
    title: "DirectOro",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "og:title",
        property: "og:title",
        name: "DirectOro",
        content:
          process.env.npm_package_description ||
          "Directorio Virtual de Traders",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "57x57",
        href: "/favicon/apple-icon-57x57.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "60x60",
        href: "/favicon/apple-icon-60x60.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "72x72",
        href: "/favicon/apple-icon-72x72.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "76x76",
        href: "/favicon/apple-icon-76x76.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "114x114",
        href: "/favicon/apple-icon-114x114.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "120x120",
        href: "/favicon/apple-icon-120x120.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "144x144",
        href: "/favicon/apple-icon-144x144.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "152x152",
        href: "/favicon/apple-icon-152x152.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "180x180",
        href: "/favicon/apple-icon-180x180.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon/android-icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon/favicon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
      },
    ],
    script: [
      {
        src: "https://www.youtube.com/iframe_api",
        type: "text/javascript",
        async: true,
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/styling/app.scss",
    "~/assets/styling/mixins.scss",
    "~/assets/styling/external/animate.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/global.js",
    "~/plugins/social.js",
    "~/plugins/fontawesome.js",
    "~/plugins/bus.js",
    "~/plugins/vuelidate.js",
    "~/plugins/rich-text.js",
    "~/plugins/firebase.js",
    "~/plugins/directives.js",
    "~/plugins/type-effect.js",
    "~/plugins/phrases-writer.js",
    "~/plugins/truncate.js",
    { src: "~/plugins/vue-youtube-embed.js", ssr: false },
    { src: `~/plugins/vue-vimeo-player.js`, ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/recaptcha",
    "@nuxtjs/pwa",
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // Workaround to avoid enforcing hard-coded
    // localhost:9699 > https://github.com/nuxt-community/axios-module/issues/308
    baseURL: API_BASE_URL || "http://localhost:9699/",
  },

  env: {},

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/styling/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.cyan,
          accent: colors.cyan.lighten1,
          secondary: colors.cyan,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent3,
          success: colors.green.accent3,
        },
      },
    },
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ["vuetify/lib", "tiptap-vuetify"],
  },

  /*
   ** Google Recaptcha
   */
  recaptcha: {
    // badge: "bottomleft", // Hide badge element (v3 & v2 via size=invisible)
    hideBadge: true,
    siteKey: "6LckYvQZAAAAALV4hor2uA8MLXnpst9VjJa7d4Zz", // Site key for requests
    version: 3, // Version
    size: "invisible", // Size: 'compact', 'normal', 'invisible' (v2)
  },

  /*
   ** Transtion
   */
  pageTransition: "slide-bottom",
};
