import Vue from 'vue';
import VueRouter from 'vue-router';
import ShoppingList from '../components/ShoppingList.vue';
import ExpiryTracker from '../components/ExpiryTracker.vue';
import Stats from '../components/Stats.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import Landing from '../components/Landing.vue';

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "ExpiryTracker",
    component: ExpiryTracker,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/shopping",
    name: "ShoppingList",
    component: ShoppingList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      guest: true
    }
  },
  {
    path: "/welcome",
    name: "Landing",
    component: Landing,
    meta: {
      guest: true
    }
  },
]


const router = new VueRouter({
  mode:'history',
  routes
})



export default router