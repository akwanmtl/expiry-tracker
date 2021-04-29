<template>
  <div class="column is-half">
    <table class="table is-striped is-fullwidth is-hoverable"> 
      <thead>
        <tr>
          <th>
            Grocery Item
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index"> 
          <td class="list-space">
            <div>{{item}}</div>
            <button @click="$emit('remove:item', item)" class="button is-primary">-</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'shopping-table',
  props: {
    items: Array,
  },
}
</script>

<style scoped>
.list-space{
  display: flex;
  justify-content: space-between;
}
.list-space div {
  line-height: 40px;
}

.list-space button {
  height: 40px;
}
</style>
