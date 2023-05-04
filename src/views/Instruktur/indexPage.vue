<template>
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <router-link :to="{ name: 'instruktur.add' }" class="btn btn-md btn-success">TAMBAH
                                INSTRUKTUR</router-link>
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">NAMA INSTRUKTUR</th>
                                        <th scope="col">TANGGAL LAHIR INSTRUKTUR</th>
                                        <th scope="col">ALAMAT INSTRUKTUR</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(instruktur, id) in instrukturs" :key="id">
                                        <td>{{ instruktur.NAMA_INSTRUKTUR }}</td>
                                        <td>{{ instruktur.TANGGAL_LAHIR_INSTRUKTUR }}</td>
                                        <td>{{ instruktur.ALAMAT_INSTRUKTUR }}</td>
                                        <td class="text-center">
                                            <router-link
                                                :to="{ name: 'instruktur.edit', params: { id: instruktur.ID_INSTRUKTUR } }"
                                                class="btn btn-sm btn-outline-primary mr-5">EDIT</router-link>
                                            <button @click.prevent="confirmDelete(instruktur.ID_INSTRUKTUR)"
                                                class="btn btn-sm btn-outline-danger ml-5">DELETE</button>
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
        let instrukturs = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData() {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/instruktur', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    instrukturs.value = response.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }

        //method delete
        function insDelete(id) {

            //delete data post by ID
            axios.delete(`http://localhost:8000/api/instruktur/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {

                    //splice posts 
                    instrukturs.value.splice(instrukturs.value.indexOf(id), 1);
                    getData()

                }).catch(error => {
                    console.log(error.response.data)
                })

        }

        function confirmDelete(id) {
            if (confirm("Are you sure you want to delete this record?")) {
                this.insDelete(id);
            }
        }


        //return
        return {
            instrukturs,
            insDelete,
            confirmDelete
        }
    }
}
</script>
<style></style>
