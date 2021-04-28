<template>
  <div id="shopping-form"  class="column is-half">
    <form @submit.prevent="handleSubmit">
      <input v-model="item.name" type="text" />
      <button>Add</button>
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