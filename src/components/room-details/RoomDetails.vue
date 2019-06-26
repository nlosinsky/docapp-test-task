<template>
	<div v-if="room" class="card">
		<div class="card-header">Room {{room.code}}</div>
		<div class="card-body">
			<p>
				<strong>Date:</strong> {{date}}
			</p>
			<p>
				<strong>Vital signs:</strong>
				HT: {{vitalSigns.height_ft}}'{{vitalSigns.height_in}}'', WT: {{vitalSigns.weight}}lbs., BMI: {{vitalSigns.bmi}}
			</p>
			<p>{{patient}}</p>

			<consent-forms v-bind:appointment="room.appointment"></consent-forms>
		</div>
	</div>

</template>
<script>
  import * as moment from "moment";
  import ConsentForms from '../consent-forms/ConsentForms.vue';
  import { getRooms } from "../../services/api";

	export default {
	  name: 'room-details',
    components: {ConsentForms},
		data() {
	    return {
	      room: null
	    }
		},
    created() {
      this.getRoom().then(room => {
        this.room = room;
        this.date = room.appointment.start_date;
        this.vitalSigns = room.appointment.vital_signs;
      });
    },
    methods: {
      async getRoom() {
        let id = this.$route.params.id;
        if (!id) {
          throw new Error('ID param is required');
        }

        id = Number(id);

        if (isNaN(id)) {
          throw new Error('Wrong id param passed');
        }

        const rooms = await getRooms();
        const targetRoom = rooms.find(room => room.code === id);

        if (!targetRoom) {
          throw new Error('Room was not found');
        }

        return targetRoom;
      },
    },
    computed: {
      patient() {
        const {first_name, last_name, birthday, gender} = this.room.appointment;
        const age = Math.abs(moment(birthday, 'MM/DD/YYYY').diff(moment(), 'years'));
        const abbrGender = gender === 'Male' ? 'M' : 'F';

        return `${this.appeal} ${first_name} ${last_name}, ${age} years, ${abbrGender}`;
      },
      appeal() {
        const {gender, is_doctor} = this.room.appointment;

        if (is_doctor) {
          return 'Dr.';
        }

        if (gender === 'Male') {
          return 'Mr.';
        }

        return 'Ms.';
      }
    }
	}
</script>
