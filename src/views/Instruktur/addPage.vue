<template>
    <div class="container">
      <h2>Add Instruktur</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nama">Nama:</label>
          <input type="text" class="form-control" id="nama" v-model="form.NAMA_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="tanggal_lahir">Tanggal Lahir:</label>
          <input type="date" class="form-control" id="tanggal_lahir" v-model="form.TANGGAL_LAHIR_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="alamat">Alamat:</label>
          <input type="text" class="form-control" id="alamat" v-model="form.ALAMAT_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="no_telp">No. Telp:</label>
          <input type="text" class="form-control" id="no_telp" v-model="form.NO_TELP_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" id="password" v-model="form.PASSWORD_INSTRUKTUR">
        </div>
        <div class="form-group">
          <label for="gaji">Gaji:</label>
          <input type="number" class="form-control" id="gaji" v-model="form.GAJI_INSTRUKTUR">
        </div>
        <button type="submit" class="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        form: {
          NAMA_INSTRUKTUR: '',
          TANGGAL_LAHIR_INSTRUKTUR: '',
          ALAMAT_INSTRUKTUR: '',
          NO_TELP_INSTRUKTUR: '',
          PASSWORD_INSTRUKTUR: '',
          GAJI_INSTRUKTUR: ''
        }
      }
    },
    methods: {
      submitForm () {
        axios.post('http://localhost:8000/api/instruktur', this.form, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
          .then(() => {
          alert("Instruktur added successfully");
          this.$router.go(-1);
        })
          .catch(error => {
            console.log(error.response.data);
            alert("Failed to add instruktur");
          })
      }
    }
  }
  </script>
  