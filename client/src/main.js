import Vue from 'vue';
import App from '@/App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import router from './router';
import store from './store';
import Axios from 'axios';


Vue.config.productionTip = false

Vue.use(Buefy)

Vue.prototype.$http = Axios;


router.beforeEach((to, from, next) =>{
  
  console.log('checking')
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const requiresGuest = to.matched.some(route => route.meta.guest)
  if(requiresAuth) {
    if(!store.getters.isLoggedIn) {
      console.log('not logged in', store.state.user)
      next('/login')
    }
    else{
      console.log('logged in', store.state.user)
      next()
      return
    }
  }
  else if(requiresGuest) {
    if(store.getters.isLoggedIn) {
      next('/')
    }
    else{
      next()
    }
  }
})

new Vue({
  router,
  store,
  beforeCreate() { this.$store.dispatch('getUser') },
  render: h => h(App)
}).$mount('#app')


