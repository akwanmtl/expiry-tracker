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
      next('/welcome')
    }
    else{
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

store
  .dispatch('getUser')
  .then(()=>{
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
  .catch((err)=>{
    console.log(err)
  })



