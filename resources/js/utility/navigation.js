module.exports = [
  {
    name: 'dashboard',
    links: [
      {
        name: 'dashboard',
        path: '/dashboard',
        icon: 'ti-server'
      }
    ]
  },
  {
    name: 'pages',
    links: [
      {
        name: 'news',
        path: '/news',
        icon: 'ti-receipt'
      },
      {
        name: 'videos',
        path: '/videos',
        icon: 'ti-receipt'
      },
      {
        name: 'dynamic page',
        path: '/dynamic-page',
        icon: 'ti-receipt'
      },
      {
        name: 'dynamic page text',
        path: '/dynamic-page-text',
        icon: 'ti-receipt'
      },
      {
        name: 'faq',
        show: false,
        icon: 'ti-agenda',
        subMenu: [
          {
            name: 'faq',
            path: '/faq',
            icon: ''
          },
          {
            name: 'faq categories',
            path: '/faq-category',
            icon: ''
          }
        ]
      }
    ]
  },
  {
    name: 'settings',
    links: [
      {
        name: 'languages',
        path: '/language',
        icon: 'ti-server'
      }
    ]
  }
]
