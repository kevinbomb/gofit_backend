<template>
    <div class="container">
      <h2>Add Instruktur</h2>
      <form @submit.prevent="addJadwal">
        <div class="form-group">
          <label for="hari">Hari:</label>
          <select class="form-control" v-model="jadwal.HARI_JADWAL" id="hari" >
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
            <option value="Sabtu">Sabtu</option>
            <option value="Minggu">Minggu</option>
          </select>
        </div>
        <div class="form-group">
          <label for="sesi">Sesi:</label>
          <input type="number" v-model="jadwal.SESI" id="sesi" class="form-control" />
        </div>
        <div class="form-group">
          <label for="kelas">Kelas:</label>
          <select v-model="jadwal.ID_KELAS" class="form-control" id="kelas">
            <option v-for="kelas in listKelas" :key="kelas.id" :value="kelas.ID_KELAS">{{ kelas.NAMA_KELAS }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="instruktur">Instruktur:</label>
          <select class="form-control" v-model="jadwal.ID_INSTRUKTUR" id="instruktur">
            <option v-for="instruktur in listInstruktur" :key="instruktur.ID_INSTRUKTUR" :value="instruktur.ID_INSTRUKTUR">{{ instruktur.NAMA_INSTRUKTUR }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Add Jadwal</button>
      </form>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        jadwal: {
          HARI_JADWAL: "",
          SESI: "",
          ID_KELAS: "",
          ID_INSTRUKTUR: "",
        },
        listKelas: [],
        listInstruktur: [],
      };
    },
    mounted() {
      this.fetchKelas();
      this.fetchInstruktur();
    },
    methods: {
      fetchKelas() {
        fetch("http://localhost:8000/api/kelas")
          .then((response) => response.json())
          .then((data) => {
            this.listKelas = data;
          });
      },
      fetchInstruktur() {
        fetch("http://localhost:8000/api/instruktur")
          .then((response) => response.json())
          .then((data) => {
            this.listInstruktur = data;
          });
      },
      addJadwal() {
        axios.post("http://localhost:8000/api/jadwal", this.jadwal, {
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
            console.log(error.response.data.message);
            alert("Failed to add instruktur");
          })
      },
    },
  };
  </script>
  