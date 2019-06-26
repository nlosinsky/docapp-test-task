/**
 * Styles
 */
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * JS
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import App from './App.vue'

Vue.use(VueRouter);

export default (function () {
  const router = new VueRouter({
    routes,
    mode: "history"
  });

  const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
}());
