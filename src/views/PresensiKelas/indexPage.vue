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
                                        <th scope="col">TANGGAL KELAS</th>
                                        <th scope="col">BOOKING OLEH</th>
                                        <th scope="col">NAMA KELAS</th>
                                        <th scope="col">PEMBAYARAN</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(presensi, id) in presensiks" :key="id">
                                        <td>{{ presensi.NO_PRESENSIK }}</td>
                                        <td>{{ presensi.TANGGAL_PRESENSIK_DIBUAT }}</td>
                                        <td>{{ presensi.TANGGAL_PRESENSIK }}</td>
                                        <td>{{ presensi.member.NAMA_MEMBER }}</td>
                                        <td>{{ presensi.NAMA_KELAS }}</td>
                                        <td v-if="presensi.member.PAKET_MEMBER==0">Reguler</td>
                                        <td v-else>Potong Paket</td>
                                        <td class="text-center">
                                            <!-- <button v-if="presensi.STATUS_JADWALH==1" @click.prevent="confirmKonfirmasi(presensi.ID_PERIZINAN)" class="btn btn-sm btn-outline-danger ml-1">LIBURKAN</button> -->
                                            <button v-if="presensi.WAKTU_PRESENSIK==null" @click.prevent="confirmKonfirmasi(presensi.NO_PRESENSIK)" class="btn btn-sm btn-outline-info ml-1">KONFIRMASI</button>
                                            <button v-else @click.prevent="confirmKonfirmasi(presensi.NO_PRESENSIK)" class="btn btn-sm btn-outline-danger disabled ml-1">KONFIRMASI</button>
                                            <!-- <td v-else>Sudah Dikonfirmasi</td> -->
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
        let presensiks = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData(){
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/presensiKelas', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    presensiks.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        function konfirmasi(id) {
            
            //delete data post by ID
            axios.put(`http://localhost:8000/api/konfPresensiKelas/${id}`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {
                getData()
                alert("Booking Diterima, Transaksi Ditambah");
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
        function confirmKonfirmasi(id) {
            if (confirm("Are you sure you want to accept this class appointment?")) {
                this.konfirmasi(id);
            }
        }

        //return
        return {
            presensiks,
            konfirmasi,
            confirmKonfirmasi
        }
    }
}
</script>
<style></style>
