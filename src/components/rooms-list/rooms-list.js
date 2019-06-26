import Vue from 'vue';
import template  from './rooms-list.html';
import rooms from '../../../data/rooms.json'; // TODO: make real API call

Vue.component('rooms-list', {
  template,
  data() {
    return {
      rooms
    }
  }
});
