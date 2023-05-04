<template>
    <div class="login-page bg-green d-flex align-items-center justify-content-center" style="min-height: 100vh;">
      <!-- <div class=""> -->
        <!-- <div class="row justify-content-center">
          <div class="col-md-6"> -->
            <div class="card" style="width: 400px;">
              <div class="card-header text-center bg-warning">
                <h2>Log In</h2>
              </div>
              <div class="card-body">
                <form @submit.prevent="login">
                  <div class="form-group">
                    <label for="id_pegawai">ID PEGAWAI:</label>
                    <input type="text" id="id_pegawai" class="form-control" v-model="id_pegawai" required>
                  </div>
                  <div class="form-group">
                    <label for="password">PASSWORD:</label>
                    <input type="password" id="password" class="form-control" v-model="password" required>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block mt-4">Log In</button>
                </form>
              </div>
            </div>
          <!-- </div>
        </div> -->
      <!-- </div> -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        id_pegawai: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/loginpegawai', {
            id_pegawai: this.id_pegawai,
            password: this.password,
          });
          const token = response.data.token;
          localStorage.setItem("token", token);
          const role = response.data.user.ROLE_PEGAWAI;
          localStorage.setItem("logInAs", role);
          this.$router.push({ name: "beranda",})
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style>
  .bg-green {
    background-color: #1B5E20; /* Green background color */
  }
  
  h2 {
    color: #FFFFFF; /* White text color */
    margin-bottom: 1rem;
  }
  </style>
  