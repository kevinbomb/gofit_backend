<template>
  
    <div class="container" style="border: solid black;">
      <h2  class="mt-5 card-header">Member Card</h2>
      <form @submit.prevent="print">
        <div class="form-group">
          <label for="no_member" class="mt-2">ID:</label>
          <input disabled type="text" class="form-control" id="no_member" v-model="member.NO_MEMBER">
        </div>
        <div class="form-group">
          <label for="nama" class="mt-2">Nama:</label>
          <input disabled type="text" class="form-control" id="nama" v-model="member.NAMA_MEMBER">
        </div>
        <div class="form-group">
          <label for="tanggal_lahir" class="mt-2">Tanggal Lahir:</label>
          <input disabled type="date" class="form-control" id="tanggal_lahir" v-model="member.TANGGAL_LAHIR_MEMBER">
        </div>
        <div class="form-group">
          <label for="alamat" class="mt-2">Alamat:</label>
          <input disabled type="text" class="form-control" id="alamat" v-model="member.ALAMAT_MEMBER">
        </div>
        <div class="form-group">
          <label for="no_telp" class="mt-2">No. Telp:</label>
          <input disabled type="text" class="form-control" id="no_telp" v-model="member.NO_TELP_MEMBER">
        </div>
        <div class="form-group">
          <label for="exp" class="mt-2">Berlaku sampai:</label>
          <input disabled type="text" class="form-control mb-4" id="exp" v-model="member.TANGGAL_EXP_MEMBER">
        </div>
        <button type="submit" class="d-flex right btn btn-primary mb-5">Print</button>
      </form>
    </div>
  </template>
  
  <script >
  import { reactive, ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import axios from 'axios'
  
  export default {
    setup() {
        const member = reactive({
          NO_MEMBER: '',
          NAMA_MEMBER: '',
          TANGGAL_LAHIR_MEMBER: '',
          ALAMAT_MEMBER: '',
          NO_TELP_MEMBER: '',
          TANGGAL_EXP_MEMBER: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //params id
        const route = useRoute();

        onMounted(() => {
            getData()

        });

        function getData(){
          axios.get("http://localhost:8000/api/member/" + route.params.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }})
            .then((response) => {
            console.log(response.data);
            member.NO_MEMBER = response.data.data.NO_MEMBER;
            member.NAMA_MEMBER = response.data.data.NAMA_MEMBER;
            member.TANGGAL_LAHIR_MEMBER = response.data.data.TANGGAL_LAHIR_MEMBER;
            member.ALAMAT_MEMBER = response.data.data.ALAMAT_MEMBER;
            member.NO_TELP_MEMBER = response.data.data.NO_TELP_MEMBER;
            member.TANGGAL_EXP_MEMBER = response.data.data.TANGGAL_EXP_MEMBER;
            })
            .catch((error) => {
            console.log(error.response.data);
            });
        }

        function print() {
          window.print();
        }
       
        //return
        return {
            validation,
            member,
            router,
            print,
        }
    }
}
  </script>
  