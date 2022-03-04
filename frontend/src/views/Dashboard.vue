<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5 pt-md-8">
      <stats />
    </base-header>

    <div class="container-fluid mt--7">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 class="h3 text-white mb-0">Sales value</h5>
                </div>
                <div class="col">
                  <ul class="nav nav-pills justify-content-end">
                    <li class="nav-item mr-2 mr-md-0">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: bigLineChart.activeIndex === 0 }"
                        @click.prevent="initBigChart(0)"
                      >
                        <span class="d-none d-md-block">Month</span>
                        <span class="d-md-none">M</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: bigLineChart.activeIndex === 1 }"
                        @click.prevent="initBigChart(1)"
                      >
                        <span class="d-none d-md-block">Week</span>
                        <span class="d-md-none">W</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="salesChartID"></canvas>
            </div>
          </card>
        </div>
      </div>
      <!-- End charts-->

      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Charts
import { ordersChart } from '@/components/Charts/Chart';
import Chart from 'chart.js';
import Stats from '@/components/Stats';

let chart;

export default {
  components: {
    Stats,
  },
  data() {
    return {
      salesChartID: 'salesChart',
      ordersChartID: 'ordersChart',
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
      },
    };
  },
  methods: {
    async getStas() {
      await this.$store
        .dispatch('sales/getStats')
        .then((res) => {
          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched stats',
            type: 'success',
          });
          console.log(res);
        })
        .catch((err) => {
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Stats cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
    initBigChart(index) {
      chart.destroy();
      chart = new Chart(
        document.getElementById(this.salesChartID).getContext('2d'),
        {
          type: 'line',
          data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Performance',
                tension: 0.4,
                borderWidth: 4,
                borderColor: '#5e72e4',
                pointRadius: 0,
                backgroundColor: 'transparent',
                data: this.bigLineChart.allData[index],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
              mode: 'index',
              intersect: false,
            },
            scales: {
              yAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: 'transparent',
                  },
                  ticks: {
                    padding: 0,
                    fontColor: '#8898aa',
                    fontSize: 13,
                    fontFamily: 'Open Sans',
                  },
                },
              ],
              xAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: 'transparent',
                  },
                  ticks: {
                    padding: 10,
                    fontColor: '#8898aa',
                    fontSize: 13,
                    fontFamily: 'Open Sans',
                  },
                },
              ],
            },
            layout: {
              padding: 0,
            },
          },
        },
      );
      this.bigLineChart.activeIndex = index;
    },
  },
  async mounted() {
    await this.getStas();
    chart = new Chart(
      document.getElementById(this.salesChartID).getContext('2d'),
      {
        type: 'line',
        data: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Performance',
              tension: 0.4,
              borderWidth: 4,
              borderColor: '#5e72e4',
              pointRadius: 0,
              backgroundColor: 'transparent',
              data: this.bigLineChart.allData[1],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(29,140,248,0.0)',
                  zeroLineColor: 'transparent',
                },
                ticks: {
                  padding: 0,
                  fontColor: '#8898aa',
                  fontSize: 13,
                  fontFamily: 'Open Sans',
                },
              },
            ],
            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(29,140,248,0.0)',
                  zeroLineColor: 'transparent',
                },
                ticks: {
                  padding: 10,
                  fontColor: '#8898aa',
                  fontSize: 13,
                  fontFamily: 'Open Sans',
                },
              },
            ],
          },
          layout: {
            padding: 0,
          },
        },
      },
    );
    ordersChart.createChart(this.ordersChartID);
  },
};
</script>
<style></style>
