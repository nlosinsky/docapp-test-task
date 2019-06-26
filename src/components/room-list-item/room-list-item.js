import Vue from 'vue';
import template from './room-list-item.html';
import * as moment from 'moment';
import * as momentDuration from 'moment-duration-format';

momentDuration(moment);

// TODO: add timer
function getTimeDiff(time) {
  const updateTime = moment(time);
  const formattedTime = [updateTime.hours(), updateTime.minutes(), updateTime.seconds()].join(':');
  const updateTimeMoment = moment(formattedTime, 'HH:mm:SS');

  if (updateTimeMoment.isAfter(moment())) {
    updateTimeMoment.add(-1, 'days');
  }

  const diff = moment().diff(updateTimeMoment);

  return moment.duration(diff, "milliseconds").format('HH:mm:SS')
}

export default Vue.component('room-list-item', {
  template,
  props: ['room'],
  data() {
    return {
      appointmentTime: moment(this.room.appointment.start_time, 'HH:mm').format('hh:mm A'),
      timeSinceLastUpdate: getTimeDiff(this.room.update_time)
    }
  }
});
