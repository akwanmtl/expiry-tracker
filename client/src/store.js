import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const BASE_URL = 'http://localhost:3001/';
// const BASE_URL = 'https://food-lifesaver.herokuapp.com/'

const store = new Vuex.Store({
  state:{
    status: "",
    user: {},
    foods: [],
    purchaseName: "",
    finished: 0,
    expired: 0
  },
  mutations:{
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, user){
      state.status = 'success',
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.user = {}
      state.foods = []
      state.purchaseName= ""
      state.finished = 0
      state.expired = 0
    },
    get_food(state,foods){
      if(state.foods.length === 0) state.foods = foods; 
      if(state.finished === 0) state.finished = state.user.finished;
      if(state.expired === 0) state.expired = state.user.expired + foods.filter(food =>{
        let foodExpiry = new Date(food.expiryDate);
        foodExpiry.setHours(0,0,0,0);
        let today = new Date();
        today.setHours(0,0,0,0)
        return food.location !== 'Shopping' && foodExpiry < today
      }).length;
    },
    add_food(state,food){
      state.foods = [...state.foods, food];
      state.purchaseName = "";
    },
    delete_food(state,id){
      let removedFood = state.foods.filter(food => food._id === id)[0];
      state.foods = state.foods.filter(food => food._id !== id);
      if(removedFood.location !== 'Shopping') {
        let foodExpiry = new Date(removedFood.expiryDate);
        foodExpiry.setHours(0,0,0,0);
        let today = new Date();
        today.setHours(0,0,0,0)
        if(foodExpiry >= today) state.finished = state.finished  + 1;
        else state.expired  = state.expired + 1;
        console.log(state.finished, state.expired)
      }
    },
    update_food(state,id){
      let unchangedFoods = state.foods.filter(food => food._id !== id);
      let changedFood = state.foods.filter(food => food._id === id)[0];
      changedFood.location = "Shopping"
      state.foods = [...unchangedFoods, changedFood]
      let foodExpiry = new Date(changedFood.expiryDate);
      foodExpiry.setHours(0,0,0,0);
      let today = new Date();
      today.setHours(0,0,0,0)
      if(foodExpiry >= today) state.finished = state.finished  + 1;
      else state.expired = state.expired + 1;
    },
    purchase_food(state,name){
      state.purchaseName = name
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${BASE_URL}auth/login`, data: user, method: 'POST' , withCredentials: true, credentials: 'include' })
        .then(response => {
          const user = response.data
          commit('auth_success', user)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    getUser({commit}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${BASE_URL}auth/user`, method: 'GET' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const user = response.data
          commit('auth_success', user)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    signup({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: `${BASE_URL}auth/signup`, data: user, method: 'POST' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const user = response.data
          commit('auth_success', user)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        axios({url: `${BASE_URL}auth/logout`, method: 'GET' , withCredentials: true, credentials: 'include'})
        resolve()
      })
    },
    getFoods({commit}) {
      commit('auth_request')
      return new Promise((resolve, reject) => {
        axios({url: `${BASE_URL}api/food`, method: 'GET' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const foods = response.data
          commit('get_food', foods)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    addFood({commit}, food) {
      commit('auth_request')
      return new Promise((resolve, reject) => {
        axios({url: `${BASE_URL}api/food`, data: food, method: 'POST' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const food = response.data
          commit('add_food', food)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    deleteFood({commit}, id) {
      commit('auth_request')
      return new Promise((resolve, reject) => {
        axios({url: `${BASE_URL}api/food/${id}`, method: 'DELETE' , withCredentials: true, credentials: 'include'})
        .then(response => {
          commit('delete_food', id)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    updateFood({commit}, food) {
      commit('auth_request')
      let foodExpiry = new Date(food.expiryDate);
      let expired = (foodExpiry < new Date());
      return new Promise((resolve, reject) => {
        axios({url: `${BASE_URL}api/food/${food._id}`, data: {location: "Shopping", expiryDate: new Date(), expired: expired}, method: 'PUT' , withCredentials: true, credentials: 'include'})
        .then(response => {
          commit('update_food', food._id)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    purchaseFood({commit}, name){
      commit('purchase_food',name)
      return this.state.purchaseName
    }
  },
  getters: {
    isLoggedIn: state => !(Object.keys(state.user).length === 0),
    authStatus: state => state.status,
    getFoods: state => state.foods.sort((a,b)=>{
      const aTime = new Date(a.expiryDate);
      const bTime = new Date(b.expiryDate);
      return aTime-bTime;
    }),
    getPurchaseName: state => state.purchaseName,
    getUser: state => state.user,
    getFinished: state => state.finished,
    getExpired: state => state.expired,
  }
})

export default store