import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import LegalPage from './pages/LegalPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import ProjectDetailPage from './pages/ProjectDetailPage.vue'
import ResumePage from './pages/ResumePage.vue'
import AboutPage from './pages/AboutPage.vue'
import { applySeo, metaForRoute } from './utils/seo.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
  {
    path: '/resume',
    name: 'resume',
    component: ResumePage,
  },
  {
    path: '/legal',
    name: 'legal',
    component: LegalPage,
  },
  {
    path: '/project/:slug',
    name: 'project-detail',
    component: ProjectDetailPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  applySeo(metaForRoute(to))
})

export default router
