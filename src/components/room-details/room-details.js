import Vue from 'vue';
import template from './room-details.html';
import rooms from '../../../data/rooms.json'; // TODO: make real API call
import * as moment from "moment";

export default Vue.component('room-details', {
  template,
  created() {
    this.room = this.getRoom();
    this.date = this.room.start_date;
    this.vitalSigns = this.room.appointment.vital_signs;
  },
  methods: {
    getRoom() {
      let id = this.$route.params.id;
      if (!id) {
        throw new Error('ID param is required');
      }

      id = Number(id);

      if (isNaN(id)) {
        throw new Error('Wrong id param passed');
      }

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
})
