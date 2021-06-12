<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['finishedItems','expiredItems','chartOptions'],
  mounted(){
    this.renderPieChart();
  },
  computed: {
    data: function() {
      return [this.finishedItems, this.expiredItems]
    }
  },
  methods: {
    renderPieChart: function() {
      console.log('rendering pie chart', this.data)
      this.renderChart(
        {
          labels:[
            'Finished',
            'Expired'
          ],
          datasets:[{
            label: 'Your Stats',
            data: this.data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
          }]
        }, 
        this.chartOptions
      )
    }
  },
  watch: {
    finishedItems(newData, oldData) {
      console.log('compare: ', newData)
      console.log('old: ', oldData)
      this.renderPieChart();
    },
    
    expiredItems(newData, oldData) {
      console.log('compare: ', newData)
      console.log('old: ', oldData)
      this.renderPieChart();
    }
  }
}

</script>