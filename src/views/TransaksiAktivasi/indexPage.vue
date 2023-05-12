<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <!-- <router-link :to="{name: 'aktivasi.add'}" class="btn btn-md btn-success">TAMBAH JADWAL</router-link> -->
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">NO TRANSAKSI</th>
                                        <th scope="col">NAMA MEMBER</th>
                                        <th scope="col">TANGGAL TRANSAKSI</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(aktivasi, id) in aktivasis" :key="id">
                                        <td>{{ aktivasi.ID_TRANSAKSIA }}</td>
                                        <td>{{ aktivasi.member.NAMA_MEMBER }}</td>
                                        <td>{{ aktivasi.TANGGAL_TRANSAKSIA }}</td>
                                        <td class="text-center">
                                            <router-link :to="{name:'transaksiA.card', params: { id: aktivasi.ID_TRANSAKSIA }}" class="btn btn-sm btn-outline-success">SHOW</router-link>
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
        let aktivasis = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData(){
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/transaksiA', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    aktivasis.value = response.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        
        //return
        return {
            aktivasis,
        }
    }
}
</script>
<style></style>
