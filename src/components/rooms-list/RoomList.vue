<template>
	<div v-if="rooms.length">
		<room-list-item
				v-for="room in rooms"
				v-bind:room="room"
				v-bind:key="room.code"
				v-on:click.native="goToRoom(room.code)"
		></room-list-item>
	</div>
</template>

<script>
  import RoomListItem from './RoomListItem.vue';
  import { getRooms } from "../../services/api";

	export default {
	  name: 'room-list',
    components: {RoomListItem},
    data() {
      return {
        rooms: []
      }
    },
		created() {
	    this.initRooms();
		},
    methods: {
      goToRoom: function(code) {
        this.$router.push(`/room/${code}`);
      },
	    async initRooms() {
        const res = await getRooms();

        if (res && res.length) {
          this.rooms = res;
        }
	    }
    }
	}
</script>
