<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <button @click.prevent="genJadwal()" class="btn btn-l btn-success ml-1">GENERATE JADWAL</button>
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">TANGGAL</th>
                                        <th scope="col">SESI</th>
                                        <th scope="col">NAMA KELAS</th>
                                        <th scope="col">NAMA INSTRUKTUR</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(jadwal, id) in jadwals" :key="id">
                                        <td>{{ jadwal.TANGGAL_JADWALH }}</td>
                                        <td>{{ jadwal.SESI }}</td>
                                        <td>{{ jadwal.NAMA_KELAS }}</td>
                                        <td>{{ jadwal.NAMA_INSTRUKTUR }}</td>
                                        <td v-if="jadwal.STATUS_JADWALH==1">NORMAL</td>
                                        <td v-else>LIBUR</td>
                                        <td class="text-center">
                                            <button v-if="jadwal.STATUS_JADWALH==1" @click.prevent="confirmLibur(jadwal.ID_JADWALH)" class="btn btn-sm btn-outline-danger ml-1">LIBURKAN</button>
                                            <button v-else @click.prevent="confirmLibur(jadwal.ID_JADWALH)" class="btn btn-sm btn-outline-info ml-1">BATALKAN</button>
                                        </td>
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
        let jadwals = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData(){
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/jadwalHarian', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    jadwals.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        function genJadwal() {
            
            //delete data post by ID
            axios.post(`http://localhost:8000/api/jadwalHarian`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {
                getData()
                alert("Jadwal Minggu Ini");
             }).catch(error => {
                 console.log(error.response.data)
                 alert("Gagal Generate");
             })
         
        }

        function makeLibur(id) {
            
            //delete data post by ID
            axios.put(`http://localhost:8000/api/jadwalHarian/${id}`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {
                getData()
                alert("Status Kelas Diubah");
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
        function confirmLibur(id) {
            if (confirm("Are you sure you want to change this class status?")) {
                this.makeLibur(id);
            }
        }

        //return
        return {
            jadwals,
            makeLibur,
            confirmLibur,
            genJadwal
        }
    }
}
</script>
<style></style>
