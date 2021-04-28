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
        <tr v-for="item in items" :key="item-id"> 
          <td class="list-space">
            <div>{{item}}</div>
            <button class="button is-primary">-</button>
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
