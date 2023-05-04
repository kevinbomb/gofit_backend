<template>
  <div class="container">
    <h2>Edit Jadwal</h2>
    <form @submit.prevent="update">
      <div class="form-group">
        <label for="hari">Hari:</label>
        <select class="form-control" v-model="jadwal.HARI_JADWAL" id="hari">
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
          <option v-for="kelas in kelasku" :key="kelas.ID_KELAS" :value="kelas.ID_KELAS">
            {{ kelas.NAMA_KELAS }}</option>  
          <!-- <option value="1">Body Combat</option>
            <option value="2">Yoga</option>
            <option value="3">Belly Dance</option>
            <option value="4">Zumba</option>   -->
        </select>
      </div>
      <div class="form-group">
        <label for="instruktur">Instruktur:</label>
        <select class="form-control" v-model="jadwal.ID_INSTRUKTUR" id="instruktur">
          <!-- <option v-for="instruktur in instrukturs" :key="instruktur.ID_INSTRUKTUR" :value="instruktur.ID_INSTRUKTUR"></option> -->
          <option v-for="bodat in instrukturs" :key="bodat.ID_INSTRUKTUR" :value="bodat.ID_INSTRUKTUR">
            {{ bodat.NAMA_INSTRUKTUR }}</option>
            
        </select>
      </div>
      <button type="submit" class="btn btn-primary mt-4">Edit Jadwal</button>
    </form>
  </div>
</template>
  
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
  setup() {
    let instrukturs = ref([]);
    let kelasku = ref([]);

    const jadwal = reactive({
      HARI_JADWAL: "",
      SESI: "",
      ID_KELAS: "",
      ID_INSTRUKTUR: "",
    })
    //state validation
    const validation = ref([])
    //vue router
    const router = useRouter()
    //params id
    const route = useRoute();

    onMounted(() => {
      axios.get("http://localhost:8000/api/jadwal/" + route.params.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
        .then((response) => {
          //console.log(response.data);
          jadwal.HARI_JADWAL = response.data.data.HARI_JADWAL;
          jadwal.SESI = response.data.data.SESI;
          jadwal.ID_KELAS = response.data.data.ID_KELAS;
          jadwal.ID_INSTRUKTUR = response.data.data.ID_INSTRUKTUR;
          getIns();
          getKel();
        })
        .catch((error) => {
          console.log(error.response.data);
        });


      getIns();
      getKel();
    });
    //method update
    function update() {
      let HARI_JADWAL = jadwal.HARI_JADWAL;
      let SESI = jadwal.SESI;
      let ID_KELAS = jadwal.ID_KELAS;
      let ID_INSTRUKTUR = jadwal.ID_INSTRUKTUR;
      axios.put("http://localhost:8000/api/jadwal/" + route.params.id, {
        HARI_JADWAL: HARI_JADWAL,
        SESI: SESI,
        ID_KELAS: ID_KELAS,
        ID_INSTRUKTUR: ID_INSTRUKTUR,
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }).then(() => {
        //redirect ke post index
        router.push({
          name: 'jadwal.index'
        })
        alert('Berhasil Ubah Jadwal!')
      }).catch(error => {
        //assign state validation with error 
        validation.value = error.response.data
      })
    }

    function getKel() {
      axios.get("http://localhost:8000/api/kelas", {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((response) => {
          //assign state posts with response data
          kelasku.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }


    function getIns() {
      axios.get("http://localhost:8000/api/instruktur", {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((response) => {
          //assign state posts with response data
          instrukturs.value = response.data;
          console.log(instrukturs)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //return
    return {
      jadwal,
      instrukturs,
      kelasku,
      validation,
      router,
      update,
      getIns,
      getKel,
    }
  }
}
</script>