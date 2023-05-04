<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <router-link :to="{name: 'member.add'}" class="btn btn-md btn-success">TAMBAH MEMBER</router-link>
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">NO MEMBER</th>
                                        <th scope="col">NAMA</th>
                                        <th scope="col">ALAMAT</th>
                                        <th scope="col">NO TELP</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(member, id) in members" :key="id">
                                        <td>{{ member.NO_MEMBER }}</td>
                                        <td>{{ member.NAMA_MEMBER }}</td>
                                        <td>{{ member.ALAMAT_MEMBER }}</td>
                                        <td>{{ member.NO_TELP_MEMBER }}</td>
                                        <td> <p v-if="member.STATUS_MEMBER==1">Aktif</p> 
                                             <p v-else>Belum Aktif</p>
                                        </td>
                                        <td class="text-center">
                                            <router-link :to="{name:'member.card', params: { id: member.NO_MEMBER }}" v-if="member.STATUS_MEMBER==1" class="btn btn-sm btn-outline-success">CARD</router-link>
                                            <router-link :to="{name:'member.edit', params: { id: member.NO_MEMBER }}" class="btn btn-sm btn-outline-primary">EDIT</router-link>
                                            <button @click.prevent="confirmReset(member.NO_MEMBER)" class="btn btn-sm btn-outline-warning ml-1">RESET</button>
                                            <button @click.prevent="confirmDelete(member.NO_MEMBER)" class="btn btn-sm btn-outline-danger ml-1">DELETE</button>
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
        let members = ref([])
        //mounted
        onMounted(() => {
            getData()
        })

        function getData(){
//get API from Laravel Backend
axios.get('http://localhost:8000/api/member', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    //assign state posts with response data
                    members.value = response.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        }
        //method delete
        function memDelete(id) {
            console.log(id);
            //delete data post by ID
            axios.delete(`http://localhost:8000/api/member/${id}`,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(() => {
                       
                //splice posts 
                members.value.splice(members.value.indexOf(id), 1);
                getData()
         
             }).catch(error => {
                 console.log(error.response.data)
             })
         
        }
        function confirmDelete(id) {
            if (confirm("Are you sure you want to delete this record?")) {
                this.memDelete(id);
            }
        }
        function resetP(id) {
            console.log(id);
            axios.put(`http://localhost:8000/api/memberRes/${id}`, {},{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
                }).then(() => {
                //redirect ke post index
                
                    getData()
                
                alert("Execute Reset Member Password Successfully");
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        function confirmReset(id) {
            if (confirm("Are you sure you to reset this member password?")) {
                this.resetP(id);
            }
        }

        //return
        return {
            members, memDelete, confirmDelete, resetP, confirmReset
        }
    }
}
</script>
<style></style>
