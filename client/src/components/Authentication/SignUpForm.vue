<template>
  <div id="login-form" class="column is-half">
    <form @submit.prevent="handleSignUp">
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
      
      <b-field>
        <b-input
          v-model="password2"
          type="password"
          placeholder="Confirm Password"
          icon="key"
        >
        </b-input>
      </b-field>
      <div class="is-flex is-flex-direction-row-reverse">
          <button class="button is-info">
            Sign Up
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
    name: 'signup-form',
    data() {
      return{
        username: '',
        password: '',
        password2: '',
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
      },
      password2:{
        deep: true,
        handler: function (){
          this.errorMsg = ''
        }
      }
    },
    methods:{
      handleSignUp() {
        if(this.username.trim() !== "" && this.password.trim() !== "" && this.password2.trim() !== ""){
          let username = this.username;
          let password = this.password;
          let password2 = this.password2;

          if(password === password2){
            this.$store.dispatch('signup', { username, password })
              .then((response) => {
                if(response.data === "User already exists") {
                  this.errorMsg = 'User Already Exists'
                }
                else{
                  return this.$router.push('/login')
                }
              })
              .catch(err => {
                console.log(err);
                this.errorMsg = 'Something Went Wrong'
              })
          }
          else{
            this.errorMsg = 'Password And Confirm Password Do Not Match'
          }
          
        }
        else{
          this.errorMsg = 'Please Enter Login Information'
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