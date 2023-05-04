<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <router-link :to="{name: 'jadwal.add'}" class="btn btn-md btn-success">TAMBAH JADWAL</router-link>
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">HARI</th>
                                        <th scope="col">SESI</th>
                                        <th scope="col">NAMA KELAS</th>
                                        <th scope="col">NAMA INSTRUKTUR</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(jadwal, id) in jadwals" :key="id">
                                        <td>{{ jadwal.HARI_JADWAL }}</td>
                                        <td>{{ jadwal.SESI }}</td>
                                        <td>{{ jadwal.kelas.NAMA_KELAS }}</td>
                                        <td>{{ jadwal.instruktur.NAMA_INSTRUKTUR }}</td>
                                        <td class="text-center">
                                            <router-link :to="{name:'jadwal.edit', params: { id: jadwal.ID_JADWAL }}" class="btn btn-sm btn-outline-primary mr-5">EDIT</router-link>
                                            <button @click.prevent="confirmDelete(jadwal.ID_JADWAL)" class="btn btn-sm btn-outline-danger ml-1">DELETE</button>
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
            axios.get('http://localhost:8000/api/jadwal', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    jadwals.value = response.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        //method delete
        function jadDelete(id) {
            
            //delete data post by ID
            axios.delete(`http://localhost:8000/api/jadwal/${id}`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {
                       
                //splice posts 
                jadwals.value.splice(jadwals.value.indexOf(id), 1);
                getData()
         
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
        function confirmDelete(id) {
            if (confirm("Are you sure you want to delete this record?")) {
                this.jadDelete(id);
            }
        }

        //return
        return {
            jadwals,
            jadDelete,
            confirmDelete
        }
    }
}
</script>
<style></style>
