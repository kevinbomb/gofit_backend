<template>
    <div class="payment-receipt card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="card-title mb-0 text-dark">Go-Fit Jl. Centralpark No.10 Yogyakarta</h2>
        <span class="payment-receipt__date">{{ aktivasi.TANGGAL_TRANSAKSIU }}</span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="payment-receipt__info">
              <p><strong>No Struk:          </strong> {{ aktivasi.NO_TRANSAKSIU }}</p>
              <p><strong>Member:            </strong> {{ aktivasi.NO_MEMBER }} / {{ aktivasi.NAMA_MEMBER }}</p>
              <p><strong>Deposit:  </strong> Rp. {{ aktivasi.JUMLAH }}</p>
              <p><strong>Bonus Deposit:  </strong> Rp. {{ aktivasi.BONUS }}</p>
              <p v-if="aktivasi.SISA!=null"><strong>Sisa Deposit:  </strong> Rp. {{ aktivasi.SISA }}</p>
              <p v-else><strong>Sisa Deposit:  </strong> Rp. 0</p>
              <p><strong>Total Deposit:  </strong> Rp. {{ aktivasi.TOTAL }}</p>
              <!-- <p><strong>Diterima oleh:     </strong> {{ aktivasi.ID_PEGAWAI }} / {{ aktivasi.NAMA_PEGAWAI }}</p> -->
            </div>
          </div>
          <div class="col-md-6 mt-5">
            <div class="payment-receipt__details">
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
        NO_TRANSAKSIU: "",
        TANGGAL_TRANSAKSIU: "",
        NO_MEMBER: "",
        ID_PEGAWAI: "",
        ID_PROMO: "",
        JUMLAH: "",
        BONUS: "",
        SISA: "",
        TOTAL: "",
        NAMA_MEMBER: "",
        NAMA_PEGAWAI: "",
      })
      //state validation
      const validation = ref([])
      //vue router
      const router = useRouter()
      //params id
      const route = useRoute();
  
      onMounted(() => {
        axios.get("http://localhost:8000/api/transaksiU/" + route.params.id, {
                  headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
              })
          .then((response) => {
            //console.log(response.data);
            aktivasi.NO_TRANSAKSIU = response.data.data.NO_TRANSAKSIU;
            aktivasi.TANGGAL_TRANSAKSIU = response.data.data.TANGGAL_TRANSAKSIU;
            aktivasi.NO_MEMBER = response.data.data.NO_MEMBER;
            aktivasi.ID_PEGAWAI = response.data.data.ID_PEGAWAI;
            aktivasi.ID_PROMO = response.data.data.ID_PEGAWAI;
            aktivasi.JUMLAH = response.data.data.JUMLAH_TRANSAKSIU;
            aktivasi.BONUS = response.data.data.BONUS_TRANSAKSIU;
            aktivasi.SISA = response.data.data.SISA_SALDO_TRANSAKSIU;
            aktivasi.TOTAL = response.data.data.TOTAL_TRANSAKSIU;
            aktivasi.NAMA_MEMBER = response.data.data.member.NAMA_MEMBER;
            aktivasi.NAMA_PEGAWAI = response.data.data.pegawai.NAMA_PEGAWAI;
          })
          .catch((error) => {
            console.log(error.response.data);
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
  