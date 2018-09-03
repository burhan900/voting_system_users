import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Poll from '../components/poll/poll.vue'

Vue.use(VueRouter)


let router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Login',
        component: Login,
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,

      },
      {
        path: '/poll',
        name: 'Poll',
        component: Poll,
        meta : {
            requireAuth:true,
        }
      },
    ]
  })
  router.beforeEach((to,from, next)=> {

    if(to.meta.requireAuth){
        const user = JSON.parse(window.localStorage.getItem('user'))
        if(user){
            return next()
        }else{
            return next('/login')
        }
    }
    return next();
  })


  export default router
