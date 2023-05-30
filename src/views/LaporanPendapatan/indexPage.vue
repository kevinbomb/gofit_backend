<template>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow">
              <div class="card-body">
                <button @click.prevent="print()" style="float: right;" class="d-flex right btn btn-primary mb-5">Print</button>
                <h2 class="card-title mb-0 text-dark">Go-Fit Jl. Centralpark No.10 Yogyakarta</h2>
                <h2 style="text-decoration: underline;" class="card-title mb-0 text-dark">LAPORAN PENDAPATAN BULANAN</h2>
                <h4 class="card-title mb-0 text-dark">Tanggal Cetak : {{ currentDate }}</h4>
                <table class="table table-striped table-bordered mt-4">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">BULAN</th>
                      <th scope="col">AKTIVASI</th>
                      <th scope="col">DEPOSIT KELAS</th>
                      <th scope="col">DEPOSIT UANG</th>
                      <th scope="col">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(laporan, id) in laporans" :key="id">
                      <td>{{ laporan.Month }}</td>
                      <td>{{ laporan.Aktivasi }}</td>
                      <td>{{ laporan.DepositK }}</td>
                      <td>{{ laporan.DepositU }}</td>
                      <td>{{ laporan.Total }}</td>
                    </tr>
                    <tr>
                      <td colspan="4" style="text-align: center;">Total</td>
                      <td>{{ total }}</td>
                    </tr>
                  </tbody>
                </table>

                <section>
                    <canvas id="column-chart"></canvas>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
    import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

export default {
  setup() {
    // Reactive state
    const laporans = ref([]);
    const currentDate = ref(null);
    const total = ref(null);
    const chartData = ref([]);
    const chartOptions = {
      animation: {
        duration: 0,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Mounted
    onMounted(() => {
      // Register Chart.js plugins and components
      Chart.register(...registerables);

      getData();
      getCurrentDate();
    });

    function getData() {
      // Get API from Laravel Backend
      axios
        .get('http://localhost:8000/api/laporanPendapatan', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          // Assign state posts with response data
          laporans.value = response.data.data;
          total.value = response.data.total[0].subtotal;

          // Format the data for the chart
          chartData.value = response.data.data.map((item) => ({
            x: item.Month,
            y: item.Total,
          }));

          // Create the column chart
          createChart();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function getCurrentDate() {
      const date = new Date();
      currentDate.value = date.toDateString(); // Assign the value to currentDate ref
    }

    function createChart() {
      const ctx = document.getElementById('column-chart');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.value.map((item) => item.x),
          datasets: [
            {
              label: 'Total',
              data: chartData.value.map((item) => item.y),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: chartOptions,
      });
    }

    function print() {
      window.print();
    }

    // Return
    return {
      laporans,
      currentDate,
      total,
      print,
    };
  },
};

  </script>
  
  <style>
  .chart-container {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}
  </style>
  