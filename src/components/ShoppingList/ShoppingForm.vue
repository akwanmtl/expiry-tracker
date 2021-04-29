<template>
  <div id="shopping-form"  class="column is-half">
    <form @submit.prevent="handleSubmit">
      <div class="field has-addons">
      <div class="control  is-expanded">
        <input class="input is-primary" v-model="item.name" type="text" />
      </div>
          
      <div class="control">
        <button class="button is-info">
          Add
        </button>
      </div>
      </div>
    </form>
  </div>
</template>

<script> 
  export default {
    name: 'shopping-form',
    data() {
      return{
        item: {
          name: '',
        },  
      }
    },
    methods: {
      handleSubmit() {
        if(this.item.name.trim() !== ""){
          this.$emit('add:item', this.item)
          this.item = {
            name: '',
          }
        }
      },
    },
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
</style>