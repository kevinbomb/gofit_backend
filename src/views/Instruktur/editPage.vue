<template>
    <div class="container">
      <h2>Edit Instruktur</h2>
      <form @submit.prevent="update">
        <div class="form-group">
          <label for="nama">Nama:</label>
          <input type="text" class="form-control" id="nama" v-model="instruktur.NAMA_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="tanggal_lahir">Tanggal Lahir:</label>
          <input type="date" class="form-control" id="tanggal_lahir" v-model="instruktur.TANGGAL_LAHIR_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="alamat">Alamat:</label>
          <input type="text" class="form-control" id="alamat" v-model="instruktur.ALAMAT_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="no_telp">No. Telp:</label>
          <input type="text" class="form-control" id="no_telp" v-model="instruktur.NO_TELP_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input disabled type="password" class="form-control" id="password" v-model="instruktur.PASSWORD_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="gaji">Gaji:</label>
          <input type="number" class="form-control" id="gaji" v-model="instruktur.GAJI_INSTRUKTUR">
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
        const instruktur = reactive({
          NAMA_INSTRUKTUR: '',
          TANGGAL_LAHIR_INSTRUKTUR: '',
          ALAMAT_INSTRUKTUR: '',
          NO_TELP_INSTRUKTUR: '',
          PASSWORD_INSTRUKTUR: '',
          GAJI_INSTRUKTUR: ''
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //params id
        const route = useRoute();

        onMounted(() => {
            axios.get("http://localhost:8000/api/instruktur/" + route.params.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }})
            .then((response) => {
            console.log(response.data);
            instruktur.NAMA_INSTRUKTUR = response.data.data.NAMA_INSTRUKTUR;
            instruktur.TANGGAL_LAHIR_INSTRUKTUR = response.data.data.TANGGAL_LAHIR_INSTRUKTUR;
            instruktur.ALAMAT_INSTRUKTUR = response.data.data.ALAMAT_INSTRUKTUR;
            instruktur.NO_TELP_INSTRUKTUR = response.data.data.NO_TELP_INSTRUKTUR;
            instruktur.PASSWORD_INSTRUKTUR = response.data.data.PASSWORD_INSTRUKTUR;
            instruktur.GAJI_INSTRUKTUR = response.data.data.GAJI_INSTRUKTUR;
            })
            .catch((error) => {
            console.log(error.response.data);
            });

        });
        //method update
        function update() {
            let NAMA_INSTRUKTUR = instruktur.NAMA_INSTRUKTUR;
            let TANGGAL_LAHIR_INSTRUKTUR = instruktur.TANGGAL_LAHIR_INSTRUKTUR;
            let ALAMAT_INSTRUKTUR = instruktur.ALAMAT_INSTRUKTUR;
            let NO_TELP_INSTRUKTUR = instruktur.NO_TELP_INSTRUKTUR;
            let PASSWORD_INSTRUKTUR = instruktur.PASSWORD_INSTRUKTUR;
            let GAJI_INSTRUKTUR = instruktur.GAJI_INSTRUKTUR;
            axios.put("http://localhost:8000/api/instruktur/"+ route.params.id, {
                NAMA_INSTRUKTUR: NAMA_INSTRUKTUR,
                TANGGAL_LAHIR_INSTRUKTUR: TANGGAL_LAHIR_INSTRUKTUR,
                ALAMAT_INSTRUKTUR: ALAMAT_INSTRUKTUR,
                NO_TELP_INSTRUKTUR: NO_TELP_INSTRUKTUR,
                PASSWORD_INSTRUKTUR: PASSWORD_INSTRUKTUR,
                GAJI_INSTRUKTUR: GAJI_INSTRUKTUR,
            },{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
                }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'instruktur.index'
                })
                alert("Instruktur updated successfully");
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }
       
        //return
        return {
            validation,
            instruktur,
            router,
            update,
        }
    }
}
  </script>
  