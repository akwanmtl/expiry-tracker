<template>
  <div id="login-form" class="column is-half">
    <form @submit.prevent="handleLogin">
      <b-field>
        <b-input
          v-model="username"
          type="text"
          placeholder="Username"
          icon="account"
        >
        </b-input>
      </b-field>
      <b-field>
        <b-input
          v-model="password"
          type="password"
          placeholder="Password"
          icon="key"
        >
        </b-input>
      </b-field>
      <div class="is-flex is-flex-direction-row-reverse">
          <button class="button is-info">
            Login
          </button>
      </div>
    </form>
    <div class="error-div">
      <span class="error">{{errorMsg}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-form',
    data() {
      return{
        username: '',
        password: '',
        errorMsg: ''
      }
    },
    watch: {
      username:{
        deep: true,
        handler: function (){
          this.errorMsg = ''
        }
      },
      password:{
        deep: true,
        handler: function (){
          this.errorMsg = ''
        }
      }
    },
    methods:{
      handleLogin() {
        if(this.username.trim() !== "" && this.password.trim() !== ""){
          let username = this.username;
          let password = this.password
          this.$store.dispatch('login', { username, password })
          .then(() => this.$router.push('/'))
          .catch(err => {
            console.log(err);
            this.errorMsg = 'Incorrect Login Information'
          })
        }
        else{
          this.errorMsg = 'Please Enter Login Information';
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error-div {
    margin-top: 30px;
    height: 100px;
  }
  .error {
    color: red;
  }
</style>