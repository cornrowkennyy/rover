import { createRouter, createWebHistory } from 'vue-router'
import Board from '../views/Board.vue'
import Start from '../views/Start.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
  ]
})

export default router
