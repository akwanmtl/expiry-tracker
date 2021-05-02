import Vue from 'vue';
import VueRouter from 'vue-router';
import ShoppingList from '../components/ShoppingList.vue';
import ExpiryTracker from '../components/ExpiryTracker.vue';

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    name: "ExpiryTracker",
    component: ExpiryTracker,
  },
  {
    path: "/shopping",
    name: "ShoppingList",
    component: ShoppingList,
  },
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router