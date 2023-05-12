<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <!-- <router-link :to="{name: 'member.add'}" class="btn btn-md btn-success">TAMBAH MEMBER</router-link> -->
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">NO MEMBER</th>
                                        <th scope="col">NAMA</th>
                                        <th scope="col">NO TELP</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">TRANSAKSI</th>
                                        <th scope="col">JENIS DEPOSIT</th>
                                        <th scope="col">DETAIL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(member, id) in members" :key="id">
                                        <td>{{ member.NO_MEMBER }}</td>
                                        <td>{{ member.NAMA_MEMBER }}</td>
                                        <td>{{ member.NO_TELP_MEMBER }}</td>
                                        <td> <p v-if="member.STATUS_MEMBER==1" >Aktif</p> 
                                             <p v-else style="color: red;">Belum Aktif</p>
                                        </td>
                                        <td class="text-center">
                                            <button @click.prevent="confirmAktivasi(member.NO_MEMBER)" v-if="member.STATUS_MEMBER==0" class="btn btn-sm btn-outline-success mt-2">AKTIVASI</button><br>
                                            <!-- <button @click.prevent="confirmReset(member.NO_MEMBER)" class="btn btn-sm btn-outline-warning ml-1">RESET</button> -->
                                            
                                            <!-- <button @click.prevent="confirmReset(member.NO_MEMBER)" class="btn btn-sm btn-outline-warning ml-1">RESET</button>
                                            <button @click.prevent="confirmDelete(member.NO_MEMBER)" class="btn btn-sm btn-outline-danger ml-1">DELETE</button> -->
                                        </td>
                                        <td class="text-center">
                                            <!-- <router-link :to="{name:'member.edit', params: { id: member.NO_MEMBER }}" class="btn btn-sm btn-outline-primary">DEPOSIT SALDO</router-link> -->
                                            <button @click.prevent="conTambahTransaksiU(member.NO_MEMBER)" v-if="member.STATUS_MEMBER==1" class="btn btn-sm btn-outline-primary">DEPOSIT SALDO</button><br><br>
                                            <button @click.prevent="conTambahTransaksiK(member.NO_MEMBER)" v-if="member.STATUS_MEMBER==1" class="btn btn-sm btn-outline-warning">DEPOSIT KELAS</button>
                                        </td>
                                        <td>
                                            <input v-if="member.STATUS_MEMBER" placeholder="Nominal Saldo" type="number" v-model="inputUang"><br><br>
                                            <input class="col-md-3" v-if="member.STATUS_MEMBER" placeholder="Banyaknya Kelas" type="number" v-model="inputJumlah">
                                            <!-- <input class="col-md-3" v-if="member.STATUS_MEMBER" placeholder="Pilih Kelas" type="number" v-model="inputKelas"> -->
                                            <select class="col-md-3" v-if="member.STATUS_MEMBER" v-model="inputKelas">
                                                <option value="" disabled selected>Pilih Kelas</option>
                                                <option v-for="kelas in kelasku" :key="kelas.ID_KELAS" :value="kelas.ID_KELAS">{{ kelas.NAMA_KELAS }}</option>  
                                            </select>
                                            <!-- <input class="col-md-3" v-if="member.STATUS_MEMBER" placeholder="ID PROMO" type="number" v-model="selectedPromo"> -->
                                            <select class="col-md-3" v-if="member.STATUS_MEMBER" v-model="selectedPromo">
                                                <option value="" disabled selected>Pilih Promo</option>
                                                <option value= 4>Tanpa Promo</option>
                                                <option value= 2 v-if="inputJumlah==5">Promo 2 (5 Free 1)</option>
                                                <option value= 3 v-if="inputJumlah==10">Promo 3 (10 Free 2)</option>
                                            </select>

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
import { getCurrentInstance, onMounted, ref } from 'vue'
export default {
    setup() {
        let kelasku = ref([]);
        const selectedPromo = ref('');
        const inputUang = ref(null);
        const inputJumlah = ref(null);
        const inputKelas = ref('');
        const instance = getCurrentInstance()
        const router = instance.appContext.config.globalProperties.$router
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
                    getKel()
                }).catch(error => {
                    console.log(error.response.data)
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
        
        function aktivasi(id) {
            //Ubah status member
            axios.put(`http://localhost:8000/api/memberAkt/${id}`, {},{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
                }).then(() => {
                    getData()   
                alert("Status Member Diaktivasi");
            }).catch(error => {
                console.log(error.response.data)
            })
            //Tambah data transaksi
            axios.post(`http://localhost:8000/api/transaksiA/${id}`, {},{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
                })
                    // router.push({name:'transaksiA.card', params: { id: `${id}` }});
                    router.push({name:'transaksiA.index'});
            

            
        }
        function confirmAktivasi(id) {
            if (confirm("Are you sure you to activate this member status?")) {
                this.aktivasi(id);
            }
        }

        function conTambahTransaksiU(id) {
            if (confirm("Are you sure you to top up this member balance?")) {
                this.tambahTransaksiU(id);
            }
        }

        function tambahTransaksiU(id){
      const data = { JUMLAH_TRANSAKSIU: inputUang.value };
      axios.post(`http://localhost:8000/api/transaksiU/${id}`, data, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(response => {
          alert("Tambah Saldo Member Sukses");
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data);
        });
        router.push({name:'transaksiU.index'});
    }

        function conTambahTransaksiK(id) {
            if (confirm("Are you sure you to add class package to this member account?")) {
                this.tambahTransaksiK(id);
            }
        }

        function tambahTransaksiK(id){
      const data = { JUMLAH_TRANSAKSIK: inputJumlah.value, ID_KELAS: inputKelas.value, ID_PROMO: selectedPromo.value };
      axios.post(`http://localhost:8000/api/transaksiK/${id}`, data, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(response => {
          alert("Tambah Paket Kelas Sukses");
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data);
        });
        router.push({name:'transaksiK.index'});
    }

        //return
        return {
            members, aktivasi, confirmAktivasi , inputUang, inputJumlah, tambahTransaksiU, inputKelas, conTambahTransaksiU, selectedPromo, kelasku, tambahTransaksiK, conTambahTransaksiK
        }
    }
}
</script>
<style></style>
