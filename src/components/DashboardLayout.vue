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
                            <!-- member -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'member.index' }" class="nav-link">Member</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'member.index' }" class="nav-link">Member</router-link>
                                </li>
                            <!-- transaksi -->
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'kasir'" >
                                    <router-link :to="{ name: 'member.trans' }" class="nav-link">Tranasksi</router-link>
                                </li>
                                <li class="nav-item" v-if="localStorage.getItem('logInAs') == 'super admin'" >
                                    <router-link :to="{ name: 'member.trans' }" class="nav-link">Tranasksi</router-link>
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
    