<template>
  <div id="expiry-form"  class="column is-half">
    <form @submit.prevent="handleSubmit">
        <b-field>
          <b-input 
            v-model="item.name" 
            type="text" 
            placeholder="Enter Grocery Item"
            icon="food-apple"
            required>
          </b-input>
        </b-field>
        <b-field>
          <b-select 
            placeholder="Select Kitchen Location" 
            expanded
            v-model="item.location"
            selected=null
            required
          >
            <option value="Pantry">Pantry</option>
            <option value="Fridge">Fridge</option>
            <option value="Freezer">Freezer</option>
            <option value="Counter">Counter</option>
          </b-select>
        </b-field>
        <b-field>
          <b-datepicker
              v-model="item.expiryDate"
              placeholder="Set Expiration Date"
              :min-date="minDate"
              icon="calendar-today"
              trap-focus
              required>
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
          name: "",
          expiryDate: [], 
          location: null
        },
        minDate: new Date()  
      }
    },
    mounted() {
      this.item.name = this.$store.getters.getPurchaseName;
    },
    methods: {
      handleSubmit() {
        if(this.item.name.trim() !== "" && this.item.expiryDate && this.item.location){
          this.$emit('add:item', this.item)
          this.item = {
            name: '',
            expiryDate: [],
            location: null
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