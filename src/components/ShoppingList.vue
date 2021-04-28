<template>
  <div class="box">
    <h1 class="title is-1">Shopping List</h1>
    <div class="columns is-centered">
      <ShoppingForm @add:item="addItem"/>
    </div>
      
    <div class="columns is-centered">
      <ShoppingTable :items="items"/>
    </div>
  </div>
</template>

<script>
import ShoppingForm from './ShoppingList/ShoppingForm.vue' 
import ShoppingTable from './ShoppingList/ShoppingTable.vue' 

let items = [];
if(localStorage.getItem('shoppingList')){
  items = JSON.parse(localStorage.getItem('shoppingList'))
}
else{
  localStorage.setItem('shoppingList', JSON.stringify(items))
}

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
  methods:{
    addItem(item) {
      this.items = [...this.items, item.name];
      localStorage.setItem('shoppingList', JSON.stringify(this.items))
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
