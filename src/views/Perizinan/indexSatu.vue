<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <!-- <button class="btn btn-l btn-success ml-1">SUDAH DIKONFIRMASI</button> -->
                            <!-- <router-link :to="{name:'perizinan1.index'}" class="btn btn-l btn-success ml-1">IZIN TERKONFIRMASI</router-link> -->
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">IZIN OLEH</th>
                                        <th scope="col">TANGGAL</th>
                                        <th scope="col">KETERANGAN</th>
                                        <th scope="col">IZIN DIBUAT</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(perizinan, id) in perizinans" :key="id">
                                        <td>{{ perizinan.instruktur.NAMA_INSTRUKTUR }}</td>
                                        <td>{{ perizinan.TANGGAL_PERIZINAN }}</td>
                                        <td>{{ perizinan.KETERANGAN_PERIZINAN }}</td>
                                        <td>{{ perizinan.TANGGAL_PERIZINAN_DIAJUKAN }}</td>
                                        <td v-if="perizinan.STATUS_PERIZINAN==0">Belum Dikonfirmasi</td>
                                        <td v-else>Terkonfirmasi</td>
                                        <td class="text-center">
                                            <button v-if="perizinan.STATUS_JADWALH==1" @click.prevent="confirmKonfirmasi(perizinan.ID_PERIZINAN)" class="btn btn-sm btn-outline-danger ml-1">LIBURKAN</button>
                                            <button v-else @click.prevent="confirmKonfirmasi(perizinan.ID_PERIZINAN)" class="btn btn-sm btn-outline-info ml-1">BATALKAN</button>
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
        let perizinans = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData(){
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/perizinan1', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    perizinans.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        function konfirmasi(id) {
            
            //delete data post by ID
            axios.put(`http://localhost:8000/api/konfPerizinan/${id}`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {
                getData()
                alert("Status Izin Diubah");
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
        function confirmKonfirmasi(id) {
            if (confirm("Are you sure you want to change this class status?")) {
                this.konfirmasi(id);
            }
        }

        //return
        return {
            perizinans,
            konfirmasi,
            confirmKonfirmasi
        }
    }
}
</script>
<style></style>
