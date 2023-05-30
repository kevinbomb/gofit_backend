<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <button @click.prevent="print()" style="float: right;" class="d-flex right btn btn-primary mb-5">Print</button>
                            <h2 class="card-title mb-0 text-dark">Go-Fit Jl. Centralpark No.10 Yogyakarta</h2>
                            <h2 style="text-decoration: underline;" class="card-title mb-0 text-dark">LAPORAN KINERJA INSTRUKTUR BULANAN</h2>
                            <h4 style="text-decoration: underline;" class="card-title mb-0 text-dark">Bulan: Oktober</h4>
                            <h4 class="card-title mb-0 text-dark">Tanggal Cetak : {{ currentDate }}</h4>
                           <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">NAMA</th>
                                        <th scope="col">JUMLAH HADIR</th>
                                        <th scope="col">WAKTU TERLAMBAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(laporan, id) in laporans" :key="id">
                                        <td>{{ laporan.NAMA_INSTRUKTUR }}</td>
                                        <td>{{ laporan.JUMLAH_HADIR }}</td>
                                        <td v-if="laporan.TERLAMBAT==null">0</td>
                                        <td v-else>{{ laporan.TERLAMBAT }}</td>
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

        //mounted
        onMounted(() => {
            getData()
            getCurrentDate()
        })

        function getData() {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/laporanInstruktur/10', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    laporans.value = response.data.data
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
            print
        }
    }
}
</script>
<style></style>
