<template>
    <div class="container">
      <h2>Edit Member</h2>
      <form @submit.prevent="update">
        <div class="form-group">
          <label for="nama">Nama:</label>
          <input type="text" class="form-control" id="nama" v-model="member.NAMA_MEMBER">
        </div>
        <div class="form-group">
          <label for="tanggal_lahir">Tanggal Lahir:</label>
          <input type="date" class="form-control" id="tanggal_lahir" v-model="member.TANGGAL_LAHIR_MEMBER">
        </div>
        <div class="form-group">
          <label for="alamat">Alamat:</label>
          <input type="text" class="form-control" id="alamat" v-model="member.ALAMAT_MEMBER">
        </div>
        <div class="form-group">
          <label for="no_telp">No. Telp:</label>
          <input type="text" class="form-control" id="no_telp" v-model="member.NO_TELP_MEMBER">
        </div>
        <button type="submit" class="btn btn-primary mt-4">Edit</button>
      </form>
    </div>
  </template>
  
  <script>
  import { reactive, ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import axios from 'axios'
  export default {
    setup() {
        const member = reactive({
          NAMA_MEMBER: '',
          TANGGAL_LAHIR_MEMBER: '',
          ALAMAT_MEMBER: '',
          NO_TELP_MEMBER: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //params id
        const route = useRoute();

        onMounted(() => {
            axios.get("http://localhost:8000/api/member/" + route.params.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }})
            .then((response) => {
            console.log(response.data);
            member.NAMA_MEMBER = response.data.data.NAMA_MEMBER;
            member.TANGGAL_LAHIR_MEMBER = response.data.data.TANGGAL_LAHIR_MEMBER;
            member.ALAMAT_MEMBER = response.data.data.ALAMAT_MEMBER;
            member.NO_TELP_MEMBER = response.data.data.NO_TELP_MEMBER;
            })
            .catch((error) => {
            console.log(error.response.data);
            });

        });
        //method update
        function update() {
            let NAMA_MEMBER = member.NAMA_MEMBER;
            let TANGGAL_LAHIR_MEMBER = member.TANGGAL_LAHIR_MEMBER;
            let ALAMAT_MEMBER = member.ALAMAT_MEMBER;
            let NO_TELP_MEMBER = member.NO_TELP_MEMBER;
            axios.put("http://localhost:8000/api/member/"+ route.params.id, {
                NAMA_MEMBER: NAMA_MEMBER,
                TANGGAL_LAHIR_MEMBER: TANGGAL_LAHIR_MEMBER,
                ALAMAT_MEMBER: ALAMAT_MEMBER,
                NO_TELP_MEMBER: NO_TELP_MEMBER,
            },{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
                }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'member.index'
                })
                alert("Member updated successfully");
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }
       
        //return
        return {
            validation,
            member,
            router,
            update,
        }
    }
}
  </script>
  