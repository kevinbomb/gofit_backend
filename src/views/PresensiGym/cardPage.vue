<template>
    <div class="payment-receipt card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="card-title mb-0 text-dark">Go-Fit Jl. Centralpark No.10 Yogyakarta</h2>
        <span class="payment-receipt__date">{{ presensig.WAKTU_PRESENSIG }}</span>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="payment-receipt__info">
            <p>STRUK PRESENSI KEHADIRAN GYM</p>
              <p><strong>No Struk:          </strong> {{ presensig.NO_PRESENSIG }}</p>
              <p><strong>Member:            </strong> {{ presensig.NO_MEMBER }} / {{ presensig.NAMA_MEMBER }}</p>
              <p><strong>Sesi:  </strong> {{ presensig.SLOT_WAKTU_PRESENSIG }}</p>
              <p><strong>Waktu Check In:  </strong> {{ presensig.WAKTU_PRESENSIG }}</p>
              <!-- <p><strong>Jenis Kelas:  </strong> {{ presensig.NAMA_KELAS }}</p> -->
              <!-- <p><strong>Sisa Deposit:  </strong>  Rp. {{ presensig.SISA }}</p> -->
              <!-- <p><strong>Total Deposit {{ presensig.NAMA_KELAS }}:  </strong> {{ presensig.TOTAL }}</p>
              <p><strong>Berlaku sampai dengan:  </strong> {{ presensig.TANGGAL_EXP }}</p> -->
              <!-- <p><strong>Diterima oleh:     </strong> {{ presensig.ID_PEGAWAI }} / {{ presensig.NAMA_PEGAWAI }}</p> -->
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
  
      const presensig = reactive({
        NO_PRESENSIG: "",
        TANGGAL_PRESENSIG: "",
        NO_MEMBER: "",
        SLOT_WAKTU_PRESENSIG: "",
        NAMA_MEMBER: "",
        WAKTU_PRESENSIG: "",
      })
      //state validation
      const validation = ref([])
      //vue router
      const router = useRouter()
      //params id
      const route = useRoute();
  
      onMounted(() => {
        axios.get("http://localhost:8000/api/presensiG/" + route.params.id, {
                  headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
              })
          .then((response) => {
            //console.log(response.data);
            presensig.NO_PRESENSIG = response.data.data.NO_PRESENSIG;
            presensig.TANGGAL_PRESENSIG = response.data.data.TANGGAL_PRESENSIG;
            presensig.NO_MEMBER = response.data.data.NO_MEMBER;
            presensig.WAKTU_PRESENSIG = response.data.data.WAKTU_PRESENSIG;
            presensig.SLOT_WAKTU_PRESENSIG = response.data.data.SLOT_WAKTU_PRESENSIG;
            presensig.NAMA_MEMBER = response.data.data.member.NAMA_MEMBER;
            
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
        presensig,
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
  