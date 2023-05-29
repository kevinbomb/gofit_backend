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
                                        <th style="text-align: center;" colspan="3" scope="col">LAPORAN KELAS PER BULAN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.jan'}" class="btn btn-l btn-success ml-1">JAN</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.feb'}" class="btn btn-l btn-success ml-1">FEB</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.mar'}" class="btn btn-l btn-success ml-1">MAR</router-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.apr'}" class="btn btn-l btn-success ml-1">APR</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.may'}" class="btn btn-l btn-success ml-1">MAY</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.jun'}" class="btn btn-l btn-success ml-1">JUN</router-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.jul'}" class="btn btn-l btn-success ml-1">JUL</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.aug'}" class="btn btn-l btn-success ml-1">AUG</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.sep'}" class="btn btn-l btn-success ml-1">SEP</router-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.okt'}" class="btn btn-l btn-success ml-1">OKT</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.nov'}" class="btn btn-l btn-success ml-1">NOV</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanKelas.des'}" class="btn btn-l btn-success ml-1">DES</router-link>
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
            axios.get('http://localhost:8000/api/perizinan0', {
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
