<template>
    <Line
        :chartData="chartData"
        :chartOptions="chartOptions"
        :width="width"
        :height="height"
      />
  </template>
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Plugin, Filler,BorderRadius } from 'chart.js'
  import gradient from 'chartjs-plugin-gradient';
  
  ChartJS.register(Title, Tooltip, Legend,LineElement, PointElement, CategoryScale, LinearScale, gradient, Filler )
  
  
  export default {
    name: 'LineChart',
    components: { Line },
    props: {
      chartId: {
        type: String,
        default: 'line-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 600
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
              data: [40, 39, 10, 40, 39, 80, 40],
              label: '',
              // backgroundColor: '#85C250', 
              borderColor: ["#1BD19C"],
              radius: 0,
              tension:0.3,
              borderWidth: 1,
              fill:true,
              backgroundColor: (ctx) => {
                const canvas = ctx.chart.ctx;
                const gradient = canvas.createLinearGradient(0,0,0,600);

                gradient.addColorStop(0, '#1BD19C');
                gradient.addColorStop(1, '#1cd19e00');

                return gradient;
              },
            }
          ],
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales:{
              x:{
                grid:{
                  color:'#1bd19d42'
                }
              },
              y:{
                grid:{
                  color:'#1bd19d42'
                }
              }
            },
            plugins:{
                legend:{
                    display:false,
                },
                filler: {
                    propagate: true
                }
              }
            }
          }
        }
      }
  </script>
  <style lang="scss" scoped>
  </style>