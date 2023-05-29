<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <!-- <button class="btn btn-l btn-success ml-1">SUDAH DIKONFIRMASI</button> -->
                           <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">NOMOR PRESENSI</th>
                                        <th scope="col">DIBOOKING TANGGAL</th>
                                        <th scope="col">TANGGAL NGE-GYM</th>
                                        <th scope="col">SESI</th>
                                        <th scope="col">BOOKING OLEH</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(presensi, id) in presensig" :key="id">
                                        <td>{{ presensi.NO_PRESENSIG }}</td>
                                        <td>{{ presensi.TANGGAL_PRESENSIG_DIBUAT }}</td>
                                        <td>{{ presensi.TANGGAL_PRESENSIG }}</td>
                                        <td>{{ presensi.SLOT_WAKTU_PRESENSIG }}</td>
                                        <td>{{ presensi.member.NAMA_MEMBER }}</td>
                                        <td class="text-center">
                                            <!-- <button v-if="presensi.STATUS_JADWALH==1" @click.prevent="confirmKonfirmasi(presensi.ID_PERIZINAN)" class="btn btn-sm btn-outline-danger ml-1">LIBURKAN</button> -->
                                            <router-link :to="{name:'presensiG.card', params: { id: presensi.NO_PRESENSIG }}" class="btn btn-sm btn-outline-success">SHOW</router-link>
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
        let presensig = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData(){
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/presensiGym1', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    presensig.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

    

        //return
        return {
            presensig,
        }
    }
}
</script>
<style></style>
