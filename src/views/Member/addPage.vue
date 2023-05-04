<template>
    <div class="container">
      <h2>Add Member</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nama">Nama:</label>
          <input type="text" class="form-control" id="nama" v-model="form.NAMA_MEMBER">
        </div>
        <div class="form-group">
          <label for="tanggal_lahir">Tanggal Lahir:</label>
          <input type="date" class="form-control" id="tanggal_lahir" v-model="form.TANGGAL_LAHIR_MEMBER">
        </div>
        <div class="form-group">
          <label for="alamat">Alamat:</label>
          <input type="text" class="form-control" id="alamat" v-model="form.ALAMAT_MEMBER">
        </div>
        <div class="form-group">
          <label for="no_telp">No. Telp:</label>
          <input type="text" class="form-control" id="no_telp" v-model="form.NO_TELP_MEMBER">
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
          NAMA_MEMBER: '',
          TANGGAL_LAHIR_MEMBER: '',
          ALAMAT_MEMBER: '',
          NO_TELP_MEMBER: '',
        }
      }
    },
    methods: {
      submitForm () {
        axios.post('http://localhost:8000/api/member', this.form, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
          .then(() => {
          alert("Member added successfully");
          this.$router.go(-1);
        })
          .catch(error => {
            console.log(error.response.data);
            alert("Failed to add member");
          })
      }
    }
  }
  </script>
  