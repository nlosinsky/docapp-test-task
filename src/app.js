/**
 * Styles
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

/**
 * JS
 */
import Vue from 'vue';

import './components/rooms-list/rooms-list';
import './components/room/room';

export default (function () {
  new Vue({ el: '#app'});
}());
