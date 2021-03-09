
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'bar', component: () => import('pages/Bar.vue') },
      { path: 'countries', component: () => import('src/pages/CountryStats.vue') },
      { path: 'history', component: () => import('src/pages/History.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
