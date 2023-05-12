<template>
    <div class="payment-receipt card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="card-title mb-0 text-dark">Go-Fit Jl. Centralpark No.10 Yogyakarta</h2>
        <span class="payment-receipt__date">{{ aktivasi.TANGGAL_TRANSAKSIK }}</span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="payment-receipt__info">
              <p><strong>No Struk:          </strong> {{ aktivasi.NO_TRANSAKSIK }}</p>
              <p><strong>Member:            </strong> {{ aktivasi.NO_MEMBER }} / {{ aktivasi.NAMA_MEMBER }}</p>
              <p><strong>Deposit:  </strong> Rp.{{aktivasi.JUMGA}} ( {{ aktivasi.JUMLAH }} x Rp.{{ aktivasi.HARGA }} )</p>
              <p><strong>Bonus Deposit:  </strong> {{ aktivasi.BONUS }} kelas</p>
              <p><strong>Jenis Kelas:  </strong> {{ aktivasi.NAMA_KELAS }}</p>
              <!-- <p><strong>Sisa Deposit:  </strong>  Rp. {{ aktivasi.SISA }}</p> -->
              <p><strong>Total Deposit {{ aktivasi.NAMA_KELAS }}:  </strong> {{ aktivasi.TOTAL }}</p>
              <p><strong>Berlaku sampai dengan:  </strong> {{ aktivasi.TANGGAL_EXP }}</p>
              <!-- <p><strong>Diterima oleh:     </strong> {{ aktivasi.ID_PEGAWAI }} / {{ aktivasi.NAMA_PEGAWAI }}</p> -->
            </div>
          </div>
          <div class="col-md-6 mt-5">
            <div class="payment-receipt__details mt-5">
              <br><br>
              <h4 class="card-title">Kasir      : {{ aktivasi.ID_PEGAWAI }} / {{ aktivasi.NAMA_PEGAWAI }}</h4>
              <ul class="list-group">
                <!-- <li v-for="(item, index) in payment.items" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ item.description }} <span class="payment-receipt__amount">{{ formatCurrency(item.amount) }}</span>
                </li> -->
              </ul>
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
  
      const aktivasi = reactive({
        NO_TRANSAKSIK: "",
        TANGGAL_TRANSAKSIK: "",
        NO_MEMBER: "",
        ID_PEGAWAI: "",
        ID_PROMO: "",
        ID_KELAS: "",
        JUMLAH: "",
        BONUS: "",
        TOTAL: "",
        NAMA_MEMBER: "",
        NAMA_PEGAWAI: "",
        NAMA_KELAS: "",
        HARGA: "",
        TANGGAL_EXP: "",
        JUMGA: "",
      })
      //state validation
      const validation = ref([])
      //vue router
      const router = useRouter()
      //params id
      const route = useRoute();
  
      onMounted(() => {
        axios.get("http://localhost:8000/api/transaksiK/" + route.params.id, {
                  headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
              })
          .then((response) => {
            //console.log(response.data);
            aktivasi.NO_TRANSAKSIK = response.data.data.NO_TRANSAKSIK;
            aktivasi.TANGGAL_TRANSAKSIK = response.data.data.TANGGAL_TRANSAKSIK;
            aktivasi.TANGGAL_EXP = response.data.data.TANGGAL_EXP_TRANSAKSIK;
            aktivasi.NO_MEMBER = response.data.data.NO_MEMBER;
            aktivasi.ID_PEGAWAI = response.data.data.ID_PEGAWAI;
            aktivasi.ID_PROMO = response.data.data.ID_PEGAWAI;
            aktivasi.ID_KELAS = response.data.data.ID_KELAS;
            aktivasi.JUMLAH = response.data.data.JUMLAH_TRANSAKSIK;
            aktivasi.JUMGA = response.data.data.JUMLAH_TRANSAKSIK * response.data.data.kelas.BIAYA_KELAS;
            aktivasi.BONUS = response.data.data.BONUS_TRANSAKSIK;
            aktivasi.TOTAL = response.data.data.TOTAL_TRANSAKSIK;
            aktivasi.NAMA_MEMBER = response.data.data.member.NAMA_MEMBER;
            aktivasi.NAMA_PEGAWAI = response.data.data.pegawai.NAMA_PEGAWAI;
            aktivasi.NAMA_KELAS = response.data.data.kelas.NAMA_KELAS;
            aktivasi.HARGA = response.data.data.kelas.BIAYA_KELAS;
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
        aktivasi,
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
  