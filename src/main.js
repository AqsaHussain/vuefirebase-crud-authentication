// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyAUwaRu3jqfZWGhbpTwPcPPvKf6zkD7WPI",
  authDomain: "firevue-5f864.firebaseapp.com",
  databaseURL: "https://firevue-5f864.firebaseio.com",
  projectId: "firevue-5f864",
  storageBucket: "gs://firevue-5f864.appspot.com",
  messagingSenderId: "414813145294",
  appId: "1:414813145294:web:cdb5e342a7ae2713ff689f",
  measurementId: "G-LSHXMXJRLH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase=firebase;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
