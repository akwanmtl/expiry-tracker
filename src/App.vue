<template>
  <div id="app">
    <Header />
    <ShoppingList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ShoppingList from './components/ShoppingList.vue'


export default {
  name: 'App',
  components: {
    ShoppingList, 
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
  background-color:mistyrose;
}
</style>
