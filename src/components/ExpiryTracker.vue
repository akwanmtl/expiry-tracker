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
  methods:{
    addItem(item) {
      let i;
      let tempItemsArry = [...this.items]
      for(i = 0; i < tempItemsArry.length; i++){
        if(Date.parse(tempItemsArry[i].date) > Date.parse(item.date)) break;
      } 
      if(tempItemsArry.length !== i) tempItemsArry.splice(i,0,item);
      else tempItemsArry.push(item);
      
      this.items = [...tempItemsArry];
      localStorage.setItem('expiryList', JSON.stringify(this.items))
    },
    removeItem(item) {
      this.items.splice(this.items.indexOf(item),1),
      localStorage.setItem('expiryList', JSON.stringify(this.items))
    },
    addToCart(item) {
      console.log(item)
      let shopping = [];
      if(localStorage.getItem('shoppingList')){
        shopping = JSON.parse(localStorage.getItem('shoppingList'))
      }
      if(!shopping.includes(item.name)) {
        shopping.push(item.name);
        localStorage.setItem('shoppingList', JSON.stringify(shopping));
      }
      this.removeItem(item);
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
