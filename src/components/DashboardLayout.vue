<template>
    <section>
        <div class="container-fluid">


            <!-- Sidebar and Content -->
            <div class="row">
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse" style="margin-left: 5px; padding-top: 10px;">
                    <button @click.prevent="logout()" class="btn btn-lg btn-danger">Log Out</button>

                    <div class="position-sticky pt-3">
                        <ul class="nav flex-column">
                            <!-- instruktur -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'admin'">
                                    <router-link :to="{ name: 'instruktur.index' }" class="nav-link">Instruktur</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'">
                                    <router-link :to="{ name: 'instruktur.index' }" class="nav-link">Instruktur</router-link>
                                </li>
                            <!-- jadwal -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'mo'">
                                    <router-link :to="{ name: 'jadwal.index' }" class="nav-link">Jadwal</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'">
                                    <router-link :to="{ name: 'jadwal.index' }" class="nav-link">Jadwal</router-link>
                                </li>
                            <!-- jadwal harian -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'mo'">
                                    <router-link :to="{ name: 'jadwalH.index' }" class="nav-link">Jadwal Harian</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'">
                                    <router-link :to="{ name: 'jadwalH.index' }" class="nav-link">Jadwal Harian</router-link>
                                </li>
                            <!-- perizinan -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'mo'">
                                    <router-link :to="{ name: 'perizinan.index' }" class="nav-link">Perizinan</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'">
                                    <router-link :to="{ name: 'perizinan.index' }" class="nav-link">Perizinan</router-link>
                                </li>
                            <!-- member -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'member.index' }" class="nav-link">Member</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'member.index' }" class="nav-link">Member</router-link>
                                </li>
                            <!-- exp aktivasi -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'member.expA' }" class="nav-link">Member Aktivasi Expired</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'member.expA' }" class="nav-link">Member Aktivasi Expired</router-link>
                                </li>
                            <!-- exp paket -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'member.expP' }" class="nav-link">Member Paket Expired</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'member.expP' }" class="nav-link">Member Paket Expired</router-link>
                                </li>
                            <!-- transaksi -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'member.trans' }" class="nav-link">Tranasksi</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'member.trans' }" class="nav-link">Tranasksi</router-link>
                                </li>
                            <!-- list transaksi aktivasi-->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'transaksiA.index' }" class="nav-link">Tranasksi Aktivasi</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'transaksiA.index' }" class="nav-link">Tranasksi Aktivasi</router-link>
                                </li>
                            <!-- list transaksi uang-->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'transaksiU.index' }" class="nav-link">Transaksi Isi Saldo</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'transaksiU.index' }" class="nav-link">Transaksi Isi Saldo</router-link>
                                </li>
                            <!-- list transaksi kelas-->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'transaksiK.index' }" class="nav-link">Transaksi Paket Kelas</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'transaksiK.index' }" class="nav-link">Transaksi Paket Kelas</router-link>
                                </li>
                            <!-- list booking kelas-->
                                <!-- <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'presensiK.index' }" class="nav-link">Konfirmasi Booking Kelas</router-link>
                                </li> -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'presensiK.index' }" class="nav-link">Konfirmasi Booking Kelas</router-link>
                                </li>
                            <!-- trans booking kelas-->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'presensiK1.index' }" class="nav-link">Transaksi Presensi Kelas</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'presensiK1.index' }" class="nav-link">Transaksi Presensi Kelas</router-link>
                                </li>

                            <!-- list booking gym-->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'presensiG.index' }" class="nav-link">Konfirmasi Booking Gym</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'presensiG.index' }" class="nav-link">Konfirmasi Booking Gym</router-link>
                                </li>
                            <!-- trans booking gym-->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'presensiG1.index' }" class="nav-link">Transaksi Presensi Gym</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'presensiG1.index' }" class="nav-link">Transaksi Presensi Gym</router-link>
                                </li>
                                <!-- laporan gym -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'mo'">
                                    <router-link :to="{ name: 'laporanGym.index' }" class="nav-link">Laporan Gym</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'">
                                    <router-link :to="{ name: 'laporanGym.index' }" class="nav-link">Laporan Gym</router-link>
                                </li>
                                <!-- laporan kelas -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'mo'">
                                    <router-link :to="{ name: 'laporanKelas.index' }" class="nav-link">Laporan Kelas</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'">
                                    <router-link :to="{ name: 'laporanKelas.index' }" class="nav-link">Laporan Kelas</router-link>
                                </li>
                        </ul>
                    </div>
                </nav>
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <!-- Title Bar -->
                    <div id="titleBar" class="row bg-light">
                        <div class="col-12 d-flex justify-content-between">
                            <h1 class="text-center pt-3">Go-Fit</h1>
                        </div>
                    </div>
                    <!-- View Route -->
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        //reactive state
        let instrukturs = ref([])
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/instruktur')
                .then(response => {
                    //assign state posts with response data
                    instrukturs.value = response.data
                }).catch(error => {
                    console.log(error.response.data)
                })
        })

        //return
        return {
            instrukturs,
            localStorage
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push({ name: "log.in" })
        }
    }
}
</script>
<style>
body {
    font-size: .875rem;
}

.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

/*
* Sidebar
*/
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto;
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #727272;
}

.sidebar .nav-link.active {
    color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
}

/*
* Navbar
*/
.navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
    top: .25rem;
    right: 1rem;
}

.navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
}

.form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
</style>
    