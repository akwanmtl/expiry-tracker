<template>
  <div class="box">
    <h1 class="title is-1">Shopping List</h1>
    <div class="columns is-centered">
      <ShoppingForm @add:item="addItem" />
    </div>
      
    <div class="columns is-centered">
      <ShoppingTable :items="items" @remove:item="removeItem" @purchase:item="purchaseItem"/>
    </div>    
  </div>
</template>

<script>
import ShoppingForm from './ShoppingList/ShoppingForm.vue' 
import ShoppingTable from './ShoppingList/ShoppingTable.vue' 

let items = [];

export default {
  name: 'ShoppingList',
  components: {
    ShoppingForm,
    ShoppingTable
  },
  data() {
    return {
      items: [
        ...items
      ]
    }
  },
  mounted(){
    this.$store.dispatch('purchaseFood', '')
    this.$store.dispatch('getFoods')
      .then(() => {
        this.items = this.$store.getters.getFoods.filter(food =>{
          return food.location === 'Shopping'
        });        
      })
  },
  methods:{
    addItem(item) {
      this.$store.dispatch('addFood', {item})
        .then(() => 
          this.items = this.$store.getters.getFoods.filter(food =>{
            return food.location === 'Shopping'
          })   
        )
    },
    removeItem(item) {
      let removed = this.items.splice(this.items.indexOf(item),1);
      let id = removed[0]._id;
      this.$store.dispatch('deleteFood', id)
    },
    purchaseItem(item) {
      console.log(item)
      this.$store.dispatch('purchaseFood', item.name)
      let removed = this.items.splice(this.items.indexOf(item),1);
      let id = removed[0]._id;
      this.$store.dispatch('deleteFood', id)
      this.$router.push('/')
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
}
</style>
