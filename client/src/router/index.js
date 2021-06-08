import Vue from 'vue';
import VueRouter from 'vue-router';
import ShoppingList from '../components/ShoppingList.vue';
import ExpiryTracker from '../components/ExpiryTracker.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';

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
]


const router = new VueRouter({
  mode:'history',
  routes
})



export default router