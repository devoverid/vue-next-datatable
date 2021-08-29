module.exports = {
    base: "/",
    lang: 'en-US',
    title: 'Vue Next Datatable',
    description: 'Vue Next Datatable Documentation for Vue 3',
  
    themeConfig: {
      logo: 'https://vuejs.org/images/logo.png',
      sidebarDepth: 3,
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

  }
  