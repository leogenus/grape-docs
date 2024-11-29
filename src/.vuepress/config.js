const { description } = require('../../package')

module.exports = {
  theme: "vt",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Grape Dev',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  base: "/docs/",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Grape Dev',
    },
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://gitlab.com/onzabr/rbc-cms-docs',
    editLinks: true,
    docsDir: 'src',
    editLinkText: 'Edit this page on GitLab',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    nav: [
      {
        text: 'Guide',
        link: '/api-docs/',
      },
      {
        text: 'Leadlogic',
        link: 'https://leadlogic.uz'
      }
    ],
    sidebar: {
      '/api-docs/': [
        {
          title: 'API',
          collapsable: false,
          children: [
            '',
            'methods'
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
