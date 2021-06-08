<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template #end>
            <span v-if="isLoggedIn"> 
              <b-navbar-item tag="router-link" :to="{ path: '/' }">
                  Expiry Tracker
              </b-navbar-item>
              <b-navbar-item  tag="router-link" :to="{ path: '/shopping' }">
                  Shopping List
              </b-navbar-item>
              <b-navbar-item href="#">
                  Stats
              </b-navbar-item>
              <b-navbar-item  @click="logout">
                  Logout
              </b-navbar-item>
            </span>
            <span v-else> 
              <b-navbar-item  tag="router-link" :to="{ path: '/login' }">
                  Login
              </b-navbar-item>
              <b-navbar-item  tag="router-link" :to="{ path: '/signup' }">
                  Sign Up
              </b-navbar-item>
            </span>
        </template>

    </b-navbar>
</template>

<script>
  export default {
    name: 'Header',
    computed : {
      isLoggedIn : function(){ 
        console.log(this.$store.getters.isLoggedIn)
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
  }
  
</script>