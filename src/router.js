import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ProjectDetailPage from './pages/ProjectDetailPage.vue'
import ResumePage from './pages/ResumePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/resume',
    name: 'resume',
    component: ResumePage,
  },
  {
    path: '/project/:slug',
    name: 'project-detail',
    component: ProjectDetailPage,
  },
]

export default createRouter({
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
