import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router'
//import vuetify
// import vuetify from "./plugins/vuetify";

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const app = createApp(App)
//use vue router
app.use(router)
// app.use(vuetify)
app.mount('#app')