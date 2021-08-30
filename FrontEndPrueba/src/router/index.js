import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

process.env.ApiUrl= "http://localhost:3000/api/" 

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    //component: Home
    component: () => import( '../views/Home.vue')
  },
  {
    path: '/producto/',
    name: 'producto',

    component: () => import('../views/Producto.vue')
  },
/*   {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  }, */
   {
    path: '/cerrar',
    name: 'cerrar',
    component: () => import( '../views/Cerrar.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },



]



Vue.config.productionTip = false;

/* new Vue({
  router,
  render: h => h(App)
}).$mount("#app"); */


const router = new VueRouter({
  routes
})

export default router
