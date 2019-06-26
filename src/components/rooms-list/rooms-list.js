import Vue from 'vue';
import template  from './rooms-list.html';
import rooms from '../../../data/rooms.json'; // TODO: make real API call
import RoomListItem from '../room-list-item/room-list-item';

export default Vue.component('rooms-list', {
  template,
  components: {RoomListItem},
  data() {
    return {
      rooms
    }
  },
  methods: {
    goToRoom: function(code) {
      this.$router.push(`/room/${code}`);
    }
  }
});
