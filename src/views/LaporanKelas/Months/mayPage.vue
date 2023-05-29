<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <button @click.prevent="print()" style="float: right;" class="d-flex right btn btn-primary mb-5">Print</button>
                            <h2 class="card-title mb-0 text-dark">Go-Fit Jl. Centralpark No.10 Yogyakarta</h2>
                            <h2 style="text-decoration: underline;" class="card-title mb-0 text-dark">LAPORAN AKTIVITAS KELAS BULANAN</h2>
                            <h4 style="text-decoration: underline;" class="card-title mb-0 text-dark">Bulan: Mei</h4>
                            <h4 class="card-title mb-0 text-dark">Tanggal Cetak : {{ currentDate }}</h4>
                           <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">KELAS</th>
                                        <th scope="col">INSTRUKTUR</th>
                                        <th scope="col">JUMLAH LIBUR</th>
                                        <th scope="col">JUMLAH PESERTA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(laporan, id) in laporans" :key="id">
                                        <td>{{ laporan.NAMA_KELAS }}</td>
                                        <td>{{ laporan.NAMA_INSTRUKTUR }}</td>
                                        <td>{{ laporan.LIBUR }}</td>
                                        <td>{{ laporan.JUMLAH_PESERTA }}</td>
                                    </tr>

                                    <tr>
                                        <td colspan="3" style="text-align: center;">Total</td>
                                        <td>{{ total }}</td>
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        //reactive state
        let laporans = ref([])
        let currentDate = ref(null) // Define currentDate as a reactive ref
        let total = ref(null) // Define currentDate as a reactive ref

        //mounted
        onMounted(() => {
            getData()
            getCurrentDate()
        })

        function getData() {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/laporanKelas/5', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    laporans.value = response.data.data
                    total.value = response.data.total
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        function getCurrentDate() {
            const date = new Date();
            currentDate.value = date.toDateString(); // Assign the value to currentDate ref
        }

        function print() {
          window.print();
        }

        //return
        return {
            laporans,
            currentDate,
            total,
            print
        }
    }
}
</script>
<style></style>
