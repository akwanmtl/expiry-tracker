<template>
  <div class="column is-half">
    <table class="table is-striped is-fullwidth is-hoverable"> 
      <thead>
        <tr>
          <th>
            Grocery Item
          </th>
          <th>
            Time Left
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index"> 
          <td class="">
            <div>{{item.name}}</div>
          </td>
          <td class="">
            <div>{{convertDate(item.date)}}</div>
          </td>
          <td class="space-list">
            <button @click="$emit('remove:item', item)" class="button is-primary"><b-icon icon="delete"></b-icon></button>
            <button @click="$emit('addShopping:item', item)" class="button is-primary"><b-icon icon="cart"></b-icon></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'expiry-table',
  props: {
    items: Array,
  },
  methods:{
    convertDate(date) {
      let today = new Date();
      today.setHours(0,0,0,0);
      let seconds = (Date.parse(date)-Date.parse(today))/1000;
      if(seconds < 0) return 'Expired' 
      let years = Math.floor(seconds/(60*60*24*7*52))
      seconds -= years*60*60*24*7*52;
      let months = Math.floor(seconds/(60*60*24*7*4))
      seconds -= months*60*60*24*7*4;
      let weeks = Math.floor(seconds/(60*60*24*7))
      seconds -= weeks*60*60*24*7;
      let days = Math.floor(seconds/(60*60*24))
      if(years !== 0) return `${years} year${(years>1?'s':'')}`
      if(months !== 0) return `${months} month${(months>1?'s':'')}`
      if(weeks !== 0) return `${weeks} week${(weeks>1?'s':'')}`
      return `${days} day${(days>1?'s':'')}`
      
    }
  }
}
</script>

<style scoped>
td div {
  line-height: 40px;
}
.space-list button{
  margin:2px;
}

</style>
