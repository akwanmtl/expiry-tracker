<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.png"
                    alt="Food Saver Logo"
                >
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-item  v-if="isLoggedIn" tag="router-link" :to="{ path: '/' }">
                Expiry Tracker
            </b-navbar-item>
            <b-navbar-item  v-if="isLoggedIn" tag="router-link" :to="{ path: '/shopping' }">
                Shopping List
            </b-navbar-item>
            <b-navbar-item  v-if="isLoggedIn" tag="router-link" :to="{ path: '/stats' }">
                Stats
            </b-navbar-item>
            <b-navbar-item  v-if="isLoggedIn"  @click="logout">
                Logout
            </b-navbar-item>
            <b-navbar-item v-if="!isLoggedIn" tag="router-link" :to="{ path: '/login' }">
                Login
            </b-navbar-item>
            <b-navbar-item v-if="!isLoggedIn" tag="router-link" :to="{ path: '/signup' }">
                Sign Up
            </b-navbar-item>
        </template>

    </b-navbar>
</template>

<script>
  export default {
    name: 'Header',
    computed : {
      isLoggedIn : function(){ 
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