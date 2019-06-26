<template>
	<div>
		<room-list-item
				v-for="room in rooms"
				v-bind:room="room"
				v-bind:key="room.code"
				v-on:click.native="goToRoom(room.code)"
		></room-list-item>
	</div>
</template>

<script>
  import rooms from '../../../data/rooms.json'; // TODO: make real API call
  import RoomListItem from './RoomListItem.vue';

	export default {
	  name: 'room-list',
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
	}
</script>
