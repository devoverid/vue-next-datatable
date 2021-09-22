module.exports = {
    base: "/",
    lang: 'en-US',
    title: 'Vue Next Datatable',
    description: 'Vue Next Datatable Documentation for Vue 3',
  
    themeConfig: {
      logo: 'https://vuejs.org/images/logo.png',
      sidebarDepth: 3,
      navbar: [
        {
            text: 'Documentation',
            link: '/guide/getting-started',
        },
        {
            text: 'Github',
            link: 'https://github.com/devoverid/vue-next-datatable',
        },
    ],
    sidebar: [
        {
            text: "Guide",
            children: [
                '/guide/introduction.md',
                '/guide/getting-started.md',
                '/guide/plugins.md',
                '/guide/customizing.md',
            ]
        },
        {
            text: "Advanced",
            children: [
                '/advanced/customization.md',
            ]
        },
          {
              text: "Options",
              link: "/options/",
              children: [
                  '/options/debug.md',
                  '/options/defaults.md',
                  '/options/plugins.md',
              ]
          }
      ]
    },

    plugins: [
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: 'Search',
                    },
                }
            }
        ],
    ]

  }
  