import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

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
      state.status = '',
      state.user = {},
      state.foods = []
    },
    get_food(state,foods){
      state.foods = foods; 
      if(state.finished === 0) state.finished = state.user.finished;
      if(state.expired === 0) state.expired = state.user.expired + foods.filter(food =>{
        const foodExpiry = new Date(food.expiryDate)
        return food.location !== 'Shopping' && foodExpiry < new Date()
      }).length;
      console.log('state.finished', state.finished)
    },
    add_food(state,food){
      state.foods = [...state.foods, food];
      state.purchaseName = "";
    },
    delete_food(state,id){
      let removedFood = state.foods.filter(food => food._id === id)[0];
      state.foods = state.foods.filter(food => food._id !== id);
      if(removedFood.location !== 'Shopping') {
        let expiryDate = new Date(removedFood.expiryDate)
        if(expiryDate >= new Date()) state.finished = state.finished  + 1;
        else state.expired  = state.expired + 1;
      }
      console.log('finished food', state.finished)
      console.log('expired food', state.expired)
    },
    update_food(state,id){
      let unchangedFoods = state.foods.filter(food => food._id !== id);
      let changedFood = state.foods.filter(food => food._id === id)[0];
      changedFood.location = "Shopping"
      state.foods = [...unchangedFoods, changedFood]
      let expiryDate = new Date(changedFood.expiryDate)
      if(expiryDate >= new Date()) state.finished = state.finished  + 1;
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
        axios({url: 'http://localhost:3001/auth/login', data: user, method: 'POST' , withCredentials: true, credentials: 'include' })
        .then(response => {
          const user = response.data
          console.log(user.foods)
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
        axios({url: 'http://localhost:3001/auth/user', method: 'GET' , withCredentials: true, credentials: 'include'})
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
        console.log(user)
        axios({url: 'http://localhost:3001/auth/signup', data: user, method: 'POST' , withCredentials: true, credentials: 'include'})
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
        axios({url: 'http://localhost:3001/auth/logout', method: 'GET' , withCredentials: true, credentials: 'include'})
        console.log('logout')
        resolve()
      })
    },
    getFoods({commit}) {
      commit('auth_request')
      console.log('trying to get food')
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3001/api/food', method: 'GET' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const foods = response.data
          console.log(foods)
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
      console.log('adding food', food)
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3001/api/food', data: food, method: 'POST' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const food = response.data
          console.log('food', food)
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
      console.log('delete food', id)
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3001/api/food/'+id, method: 'DELETE' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const food = response.data
          console.log('food', food)
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
      console.log('updating food', food)
      let foodExpiry = new Date(food.expiryDate);
      let expired = (foodExpiry < new Date());
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:3001/api/food/'+food._id, data: {location: "Shopping", expiryDate: new Date(), expired: expired}, method: 'PUT' , withCredentials: true, credentials: 'include'})
        .then(response => {
          const food = response.data
          console.log('food', food)
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
      console.log('purchase food', name)
      commit('purchase_food',name)
      console.log('purchase food', this.state.purchaseName)
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