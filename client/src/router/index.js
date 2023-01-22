import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login'
import Clients from '../views/Clients'
import checkUser from "@/core/checkUser";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { protectedRoute: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients,
    meta: {
      protectedRoute: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const routeIsProtected = to.matched.some(item => item.meta.protectedRoute)
  if (routeIsProtected) {
    const access = await checkUser.checkUser()
    if (!access) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
