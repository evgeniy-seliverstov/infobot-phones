import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import VueNoty from 'vuejs-noty';
import 'vuejs-noty/dist/vuejs-noty.css';

Vue.use(VueNoty, {
  timeout: 2000,
  progressBar: true,
  theme: "bootstrap-v4"
});

Vue.config.productionTip = false

firebase.initializeApp({
 projectId: 'test-task-phones'
});
export const db = firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app');
