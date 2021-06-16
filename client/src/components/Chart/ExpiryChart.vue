<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['finishedItems','expiredItems'],
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
      let options = {
        hoverBorderWidth: 20
      }
      let tempdata = {
         labels:[
            'Finished',
            'Expired'
          ],
          datasets:[{
            label: 'Your Stats',
            data: this.data,
            backgroundColor: [
              '#4B81B4',
              '#B47E4B',
            ],
            hoverOffset: 4
          }]
      };
      if(!this.data[0] && !this.data[1]) {
        tempdata = {
          labels: ["No data"],
          datasets: [{
            labels:'No data',
            backgroundColor: ['#D3D3D3'],
            data: [100]
          }]
        }
      }
      this.renderChart(tempdata, options)
    }
  },
  watch: {
    finishedItems() {
      this.renderPieChart();
    },
    
    expiredItems() {
      this.renderPieChart();
    }
  }
}

</script>