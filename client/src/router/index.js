import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login'
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
    console.log(access);
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
