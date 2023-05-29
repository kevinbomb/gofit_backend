<template>
    <div class="payment-receipt card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="card-title mb-0 text-dark">Go-Fit Jl. Centralpark No.10 Yogyakarta</h2>
        <span class="payment-receipt__date">{{ presensik.WAKTU_PRESENSIK }}</span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="payment-receipt__info">
            <p v-if="presensik.PAKET_MEMBER!=0">STRUK PRESENSI KELAS PAKET</p>
            <p v-else>STRUK PRESENSI KELAS REGULER</p>
              <p><strong>No Struk:          </strong> {{ presensik.NO_PRESENSIK }}</p>
              <p><strong>Member:            </strong> {{ presensik.NO_MEMBER }} / {{ presensik.NAMA_MEMBER }}</p>
              <p><strong>Kelas:  </strong> {{ presensik.NAMA_KELAS }}</p>
              <p><strong>Tariff:  </strong> Rp.{{ presensik.TARIF_PRESENSIK }},-</p>
              <!-- <p><strong>Jenis Kelas:  </strong> {{ presensik.NAMA_KELAS }}</p> -->
              <!-- <p><strong>Sisa Deposit:  </strong>  Rp. {{ presensik.SISA }}</p> -->
              <!-- <p><strong>Total Deposit {{ presensik.NAMA_KELAS }}:  </strong> {{ presensik.TOTAL }}</p>
              <p><strong>Berlaku sampai dengan:  </strong> {{ presensik.TANGGAL_EXP }}</p> -->
              <!-- <p><strong>Diterima oleh:     </strong> {{ presensik.ID_PEGAWAI }} / {{ presensik.NAMA_PEGAWAI }}</p> -->
            </div>
          </div>
         
        </div>
      </div>
    </div>
    <button @click.prevent="print()" class="d-flex right btn btn-primary mb-5">Print</button>
  </template>
  
  <script>
  import { reactive, ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import axios from 'axios'
  export default {
    setup() {
  
      const presensik = reactive({
        NO_PRESENSIK: "",
        TANGGAL_PRESENSIK: "",
        NO_MEMBER: "",
        KELAS: "",
        ID_PROMO: "",
        ID_KELAS: "",
        JUMLAH: "",
        BONUS: "",
        TOTAL: "",
        NAMA_MEMBER: "",
        PAKET_MEMBER: "",
        NAMA_KELAS: "",
        HARGA: "",
        TARIF_PRESENSIK: "",
        WAKTU_PRESENSIK: "",
      })
      //state validation
      const validation = ref([])
      //vue router
      const router = useRouter()
      //params id
      const route = useRoute();
  
      onMounted(() => {
        axios.get("http://localhost:8000/api/presensiK/" + route.params.id, {
                  headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
              })
          .then((response) => {
            //console.log(response.data);
            presensik.NO_PRESENSIK = response.data.data.NO_PRESENSIK;
            presensik.TANGGAL_PRESENSIK = response.data.data.TANGGAL_PRESENSIK;
            presensik.TARIF_PRESENSIK = response.data.data.TARIF_PRESENSIK;
            presensik.NO_MEMBER = response.data.data.NO_MEMBER;
            presensik.NAMA_KELAS = response.data.data.NAMA_KELAS;
            presensik.ID_PROMO = response.data.data.ID_PEGAWAI;
            presensik.ID_KELAS = response.data.data.ID_KELAS;
            presensik.JUMLAH = response.data.data.JUMLAH_PRESENSIK;
            presensik.WAKTU_PRESENSIK = response.data.data.WAKTU_PRESENSIK;
            presensik.BONUS = response.data.data.BONUS_PRESENSIK;
            presensik.TOTAL = response.data.data.TOTAL_PRESENSIK;
            presensik.NAMA_MEMBER = response.data.data.member.NAMA_MEMBER;
            presensik.PAKET_MEMBER = response.data.data.member.PAKET_MEMBER;
            presensik.NAMA_KELAS = response.data.data.kelas.NAMA_KELAS;
            presensik.HARGA = response.data.data.kelas.BIAYA_KELAS;
          })
          .catch((error) => {
            console.log(error.response);
          });
  
      });
  

      function print() {
          window.print();
        }

    //   function formatCurrency(amount) {
    //     return 'Rp. ' + amount.toFixed(2);
    //   }

      //return
      return {
        presensik,
        validation,
        router,
        print,
        // formatCurrency
      }
    }
  }
  </script>
  
  <style scoped>
  .payment-receipt__date {
    font-size: 24px;
  }
  
  .payment-receipt__info {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .payment-receipt__details h4 {
    margin-top: 160px;
    margin-bottom: 0;
    float: right;
  }
  
  .payment-receipt__amount {
    font-weight: bold;
  }
  </style>
  