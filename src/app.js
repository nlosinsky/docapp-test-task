/**
 * Styles
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

/**
 * JS
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'

Vue.use(VueRouter);

export default (function () {
  const router = new VueRouter({
    routes,
    mode: "history"
  });

  new Vue({
    el: '#app',
    router
  })
}());
