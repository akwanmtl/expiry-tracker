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
          <td>
            <button @click="$emit('remove:item', item)" class="button is-primary">Remove</button>
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
      console.log(seconds)
      if(seconds < 0) return 'Expired' 
      let years = Math.floor(seconds/(60*60*24*7*52))
      seconds -= years*60*60*24*7*52;
      let months = Math.floor(seconds/(60*60*24*7*4))
      seconds -= months*60*60*24*7*4;
      let weeks = Math.floor(seconds/(60*60*24*7))
      seconds -= weeks*60*60*24*7;
      let days = Math.floor(seconds/(60*60*24))
      console.log(years,months,weeks,days)
      if(years !== 0) return `${years} year${(years>1?'s':'')}`
      if(months !== 0) return `${months} month${(months>1?'s':'')}`
      if(weeks !== 0) return `${weeks} week${(weeks>1?'s':'')}`
      return `${days} day${(days>1?'s':'')}`
      
    }
  }
}
</script>

<style scoped>
.list-space{
  display: flex;
  justify-content: space-between;
}
td div {
  line-height: 40px;
}

.list-space button {
  height: 40px;
}
</style>
