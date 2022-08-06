
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/ipolist', component: () => import('pages/IpoList.vue') },
      { path: '/ofs', component: () => import('pages/Ofs.vue') },
      { path: '/ffmc', component: () => import('pages/FreeFloat.vue') },
      { path: '/ombbs', component: () => import('pages/BuybackOpen.vue') },
      { path: '/ipo/:id', name: 'ipo', component: () => import('pages/Ipo.vue') },
      { path: '/sme/:id', name: 'sme', component: () => import('pages/Sme.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
