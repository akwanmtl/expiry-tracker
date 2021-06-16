<template>
  <div class="box">
    <h1 class="title is-1">Stats</h1>
    <div class="columns is-centered">
      <ExpiryChart :finishedItems="finishedItems" :expiredItems="expiredItems" />
    </div>
  </div>
</template>
<script>
import ExpiryChart from './Chart/ExpiryChart.vue'

export default {
  name: 'Stats',
  components: {
    ExpiryChart
  },
  mounted(){
    this.$store.dispatch('getFoods')
  },
  computed: {
    finishedItems: function() {
      let finished = this.$store.getters.getFinished;
      return finished;
    },
    expiredItems: function() {
      let expired = this.$store.getters.getExpired;
      return expired;
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