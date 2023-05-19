<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <button @click.prevent="confirmDelete()" class="btn btn-l btn-danger ml-1">BANISH EM</button>
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">NO MEMBER</th>
                                        <th scope="col">NAMA</th>
                                        <th scope="col">SALDO</th>
                                        <th scope="col">PAKET</th>
                                        <th scope="col">ALAMAT</th>
                                        <th scope="col">NO TELP</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">TANGAL EXP AKTIVASI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(member, id) in members" :key="id">
                                        <td>{{ member.NO_MEMBER }}</td>
                                        <td>{{ member.NAMA_MEMBER }}</td>
                                        <td v-if="member.SALDO_MEMBER!=null">{{ member.SALDO_MEMBER }}</td>
                                        <td v-else style="color: red;">0</td>
                                        <td>{{ member.PAKET_MEMBER }}</td>
                                        <td>{{ member.ALAMAT_MEMBER }}</td>
                                        <td>{{ member.NO_TELP_MEMBER }}</td>
                                        <td> <p v-if="member.STATUS_MEMBER==1">Aktif</p> 
                                             <p v-else style="color: red;">Belum Aktif</p>
                                        </td>
                                        <td>{{ member.TANGGAL_EXP_MEMBER }}</td>
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
        let members = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData(){
//get API from Laravel Backend
axios.get('http://localhost:8000/api/cekStatus', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    members.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }
        //method delete
        function memDelete(id) {
            console.log(id);
            //delete data post by ID
            axios.put(`http://localhost:8000/api/cekStatus`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {
                  getData()     
                alert("List Member Expired Sudah Bersih!")
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
        function confirmDelete(id) {
            if (confirm("Are you sure you want to clear all data?")) {
                this.memDelete(id);
            }
        }

        //return
        return {
            members, memDelete, confirmDelete
        }
    }
}
</script>
<style></style>
