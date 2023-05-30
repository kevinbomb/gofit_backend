<template>
    
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <!-- <button class="btn btn-l btn-success ml-1">SUDAH DIKONFIRMASI</button> -->
                            
                            <table class="table table-striped table-bordered mt-4">
                                <thead class="thead-dark">
                                    <tr>
                                        <th style="text-align: center;" colspan="3" scope="col">LAPORAN INSTRUKTUR PER BULAN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.jan'}" class="btn btn-l btn-success ml-1">JAN</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.feb'}" class="btn btn-l btn-success ml-1">FEB</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.mar'}" class="btn btn-l btn-success ml-1">MAR</router-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.apr'}" class="btn btn-l btn-success ml-1">APR</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.may'}" class="btn btn-l btn-success ml-1">MAY</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.jun'}" class="btn btn-l btn-success ml-1">JUN</router-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.jul'}" class="btn btn-l btn-success ml-1">JUL</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.aug'}" class="btn btn-l btn-success ml-1">AUG</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.sep'}" class="btn btn-l btn-success ml-1">SEP</router-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.okt'}" class="btn btn-l btn-success ml-1">OKT</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.nov'}" class="btn btn-l btn-success ml-1">NOV</router-link>
                                        </td>
                                        <td class="text-center">
                                             <router-link :to="{name:'laporanins.des'}" class="btn btn-l btn-success ml-1">DES</router-link>
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

<style></style>
