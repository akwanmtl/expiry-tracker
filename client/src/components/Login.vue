<template>
  <div class="box">
    <h1 class="title is-1">Login</h1>
    <div class="columns is-centered">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from './Authentication/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
.box{
  margin-top: 40px;
  margin-right: 40px;
  margin-left: 40px;
}
</style>
