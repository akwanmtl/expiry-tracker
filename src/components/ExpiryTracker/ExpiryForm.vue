<template>
  <div id="expiry-form"  class="column is-half">
    <form @submit.prevent="handleSubmit">
        <b-field>
          <b-input 
            v-model="item.name" 
            type="text" 
            placeholder="Enter Grocery Item"
            icon="food-apple">
          </b-input>
        </b-field>
        <b-field>
          <b-datepicker
              v-model="item.date"
              placeholder="Set Expiration Date"
              icon="calendar-today"
              trap-focus>
          </b-datepicker>
        </b-field>
        <div class="is-flex is-flex-direction-row-reverse">
          <button class="button is-info">
            Add Item
          </button>
        </div>
    </form>
    
  </div>
</template>

<script> 
  export default {
    name: 'expiry-form',
    data() {
      return{
        item: {
          name: '',
          date: []
        },  
      }
    },
    methods: {
      handleSubmit() {
        if(this.item.name.trim() !== "" && this.item.date){
          this.$emit('add:item', this.item)
          this.item = {
            name: '',
            date: []
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