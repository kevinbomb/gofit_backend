import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'log.in',
    component: () => import('@/views/loginPage.vue'),
  },
  {
    path: '/home',
    name: 'beranda',
    component: () => import('@/components/DashboardLayout.vue'),
    meta: {
      requiresAuth: true, // This route requires authentication
    },
    children: [
      {
        path: '/instruktur',
        name: 'instruktur.index',
        component: () => import('@/views/Instruktur/indexPage.vue'),
      },
      {
        path: '/instruktur/add',
        name: 'instruktur.add',
        component: () => import('@/views/Instruktur/addPage.vue'),
      },
      {
        path: '/instruktur/edit',
        name: 'instruktur.edit',
        component: () => import('@/views/Instruktur/editPage.vue'),
      },
      {
        path: '/jadwal',
        name: 'jadwal.index',
        component: () => import('@/views/Jadwal/indexPage.vue'),
      },
      {
        path: '/jadwal/add',
        name: 'jadwal.add',
        component: () => import('@/views/Jadwal/addPage.vue'),
      },
      {
        path: '/jadwal/edit',
        name: 'jadwal.edit',
        component: () => import('@/views/Jadwal/editPage.vue'),
      },
      {
        path: '/member',
        name: 'member.index',
        component: () => import('@/views/Member/indexPage.vue'),
      },
      {
        path: '/member/add',
        name: 'member.add',
        component: () => import('@/views/Member/addPage.vue'),
      },
      {
        path: '/member/edit',
        name: 'member.edit',
        component: () => import('@/views/Member/editPage.vue'),
      },
      {
        path: '/member/card',
        name: 'member.card',
        component: () => import('@/views/Member/cardPage.vue'),
      },
      {
        path: '/member/trans',
        name: 'member.trans',
        component: () => import('@/views/Member/transPage.vue'),
      },
      {
        path: '/perizinan',
        name: 'perizinan.index',
        component: () => import('@/views/Perizinan/indexPage.vue'),
      },
      {
        path: '/perizinan1',
        name: 'perizinan1.index',
        component: () => import('@/views/Perizinan/indexSatu.vue'),
      },
      {
        path: '/transaksiA',
        name: 'transaksiA.index',
        component: () => import('@/views/TransaksiAktivasi/indexPage.vue'),
      },
      {
        path: '/transaksiA/card',
        name: 'transaksiA.card',
        component: () => import('@/views/TransaksiAktivasi/cardPage.vue'),
      },
      {
        path: '/transaksiU',
        name: 'transaksiU.index',
        component: () => import('@/views/TransaksiUang/indexPage.vue'),
      },
      {
        path: '/transaksiK',
        name: 'transaksiK.index',
        component: () => import('@/views/TransaksiKelas/indexPage.vue'),
      },
      {
        path: '/transaksiU/card',
        name: 'transaksiU.card',
        component: () => import('@/views/TransaksiUang/cardPage.vue'),
      },
      {
        path: '/transaksiK/card',
        name: 'transaksiK.card',
        component: () => import('@/views/TransaksiKelas/cardPage.vue'),
      },
      {
        path: '/jadwalH',
        name: 'jadwalH.index',
        component: () => import('@/views/JadwalHarian/indexPage.vue'),
      },
      {
        path: '/expAktivasi',
        name: 'member.expA',
        component: () => import('@/views/Member/expAPage.vue'),
      },
      {
        path: '/expPaket',
        name: 'member.expP',
        component: () => import('@/views/Member/expPPage.vue'),
      },
      {
        path: '/presensiKelas',
        name: 'presensiK.index',
        component: () => import('@/views/PresensiKelas/indexPage.vue'),
      },
      {
        path: '/presensiKelas1',
        name: 'presensiK1.index',
        component: () => import('@/views/PresensiKelas/indexSatu.vue'),
      },
      {
        path: '/presensiKelas/card',
        name: 'presensiK.card',
        component: () => import('@/views/PresensiKelas/cardPage.vue'),
      },
      {
        path: '/presensiGym',
        name: 'presensiG.index',
        component: () => import('@/views/PresensiGym/indexPage.vue'),
      },
      {
        path: '/presensiGym1',
        name: 'presensiG1.index',
        component: () => import('@/views/PresensiGym/indexSatu.vue'),
      },
      {
        path: '/presensiGym/card',
        name: 'presensiG.card',
        component: () => import('@/views/PresensiGym/cardPage.vue'),
      },
      {
        path: '/laporanGym',
        name: 'laporanGym.index',
        component: () => import('@/views/LaporanGym/indexPage.vue'),
      },
      {
        path: '/laporanGymJan',
        name: 'laporanGym.jan',
        component: () => import('@/views/LaporanGym/Months/janPage.vue'),
      },
      {
        path: '/laporanGymFeb',
        name: 'laporanGym.feb',
        component: () => import('@/views/LaporanGym/Months/febPage.vue'),
      },
      {
        path: '/laporanGymMar',
        name: 'laporanGym.mar',
        component: () => import('@/views/LaporanGym/Months/marPage.vue'),
      },
      {
        path: '/laporanGymApr',
        name: 'laporanGym.apr',
        component: () => import('@/views/LaporanGym/Months/aprPage.vue'),
      },
      {
        path: '/laporanGymMay',
        name: 'laporanGym.may',
        component: () => import('@/views/LaporanGym/Months/mayPage.vue'),
      },
      {
        path: '/laporanGymJun',
        name: 'laporanGym.jun',
        component: () => import('@/views/LaporanGym/Months/junPage.vue'),
      },
      {
        path: '/laporanGymJul',
        name: 'laporanGym.jul',
        component: () => import('@/views/LaporanGym/Months/julPage.vue'),
      },
      {
        path: '/laporanGymAug',
        name: 'laporanGym.aug',
        component: () => import('@/views/LaporanGym/Months/augPage.vue'),
      },
      {
        path: '/laporanGymSep',
        name: 'laporanGym.sep',
        component: () => import('@/views/LaporanGym/Months/sepPage.vue'),
      },
      {
        path: '/laporanGymOkt',
        name: 'laporanGym.okt',
        component: () => import('@/views/LaporanGym/Months/oktPage.vue'),
      },
      {
        path: '/laporanGymNov',
        name: 'laporanGym.nov',
        component: () => import('@/views/LaporanGym/Months/novPage.vue'),
      },
      {
        path: '/laporanGymDes',
        name: 'laporanGym.des',
        component: () => import('@/views/LaporanGym/Months/desPage.vue'),
      },
      {
        path: '/laporanKelas',
        name: 'laporanKelas.index',
        component: () => import('@/views/LaporanKelas/indexPage.vue'),
      },
      {
        path: '/laporanKelasjan',
        name: 'laporanKelas.jan',
        component: () => import('@/views/LaporanKelas/Months/janPage.vue'),
      },
      {
        path: '/laporanKelasfeb',
        name: 'laporanKelas.feb',
        component: () => import('@/views/LaporanKelas/Months/febPage.vue'),
      },
      {
        path: '/laporanKelasmar',
        name: 'laporanKelas.mar',
        component: () => import('@/views/LaporanKelas/Months/marPage.vue'),
      },
      {
        path: '/laporanKelasapr',
        name: 'laporanKelas.apr',
        component: () => import('@/views/LaporanKelas/Months/aprPage.vue'),
      },
      {
        path: '/laporanKelasmay',
        name: 'laporanKelas.may',
        component: () => import('@/views/LaporanKelas/Months/mayPage.vue'),
      },
      {
        path: '/laporanKelasjun',
        name: 'laporanKelas.jun',
        component: () => import('@/views/LaporanKelas/Months/junPage.vue'),
      },
      {
        path: '/laporanKelasjul',
        name: 'laporanKelas.jul',
        component: () => import('@/views/LaporanKelas/Months/julPage.vue'),
      },
      {
        path: '/laporanKelasaug',
        name: 'laporanKelas.aug',
        component: () => import('@/views/LaporanKelas/Months/augPage.vue'),
      },
      {
        path: '/laporanKelassep',
        name: 'laporanKelas.sep',
        component: () => import('@/views/LaporanKelas/Months/sepPage.vue'),
      },
      {
        path: '/laporanKelasokt',
        name: 'laporanKelas.okt',
        component: () => import('@/views/LaporanKelas/Months/oktPage.vue'),
      },
      {
        path: '/laporanKelasnov',
        name: 'laporanKelas.nov',
        component: () => import('@/views/LaporanKelas/Months/novPage.vue'),
      },
      {
        path: '/laporanKelasdes',
        name: 'laporanKelas.des',
        component: () => import('@/views/LaporanKelas/Months/desPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'log.in' }); // Redirect to the login page
  } else {
    next(); // Proceed to the next route
  }
});

export default router;
