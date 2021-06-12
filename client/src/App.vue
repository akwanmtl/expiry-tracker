<template>
  <div id="app">
    <Header />
    <div class="fill-height">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  min-height: 100vh;
  background-color:#33CC66;
}

.fill-height {
  min-height: 100vh;
}
</style>
