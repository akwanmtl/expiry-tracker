<template>
  <div class="column is-half">
    <table class="table is-striped is-fullwidth is-hoverable"> 
      <thead>
        <tr>
          <th>
            Grocery Item
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index"> 
          <td>
            <div>{{item.name}}</div>
          </td>
          <td class="list-space">
            <button @click="$emit('purchase:item', item)" class="button is-primary"><b-icon icon="fridge"></b-icon></button>
            <button @click="$emit('remove:item', item)" class="button is-primary"><b-icon icon="delete"></b-icon></button>
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
  justify-content: center;
}
.list-space div {
  line-height: 40px;
}

.list-space button {
  height: 40px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
