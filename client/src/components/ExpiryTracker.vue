<template>
  <div class="box">
    <h1 class="title is-1">Expiry List</h1>
    <div class="columns is-centered">
      <ExpiryForm @add:item="addItem" />
    </div>
      
    <div class="columns is-centered">
      <ExpiryTable :items="items" @remove:item="removeItem" @addShopping:item="addToCart"/>
    </div>
  </div>
</template>

<script>
import ExpiryForm from './ExpiryTracker/ExpiryForm.vue'
import ExpiryTable from './ExpiryTracker/ExpiryTable.vue' 

let items = [];
if(localStorage.getItem('expiryList')){
  items = JSON.parse(localStorage.getItem('expiryList'))
}
else{
  localStorage.setItem('expiryList', JSON.stringify(items))
}

export default {
  name: 'ExpiryTracker',
  components: {
    ExpiryForm,
    ExpiryTable
  },
  data() {
    return {
      items: [
        ...items
      ]
    }
  },
  mounted(){
    this.$store.dispatch('getFoods')
      .then(() => {
        this.items = this.$store.getters.getFoods.filter(food =>{
          return food.location !== 'Shopping'
        });        
      })
  },
  methods:{
    addItem(item) {
      this.$store.dispatch('addFood', {item})
        .then(() => 
          this.items = this.$store.getters.getFoods.filter(food =>{
            return food.location !== 'Shopping'
          })   
        )
    },
    removeItem(item) {
      let removed = this.items.splice(this.items.indexOf(item),1);
      let id = removed[0]._id;
      this.$store.dispatch('deleteFood', id)
      console.log(id)
    },
    addToCart(item) {
      console.log(item)
      let removed = this.items.splice(this.items.indexOf(item),1);
      this.$store.dispatch('updateFood', removed[0])
    }
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
  min-height: 100%;
}
</style>
