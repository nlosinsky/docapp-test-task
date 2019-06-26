<template>
	<div class="card mb-3">
		<div class="card-body">
			<h5 class="card-title">
				Room {{room.code}} ({{room.appointment.code}})
				<small class="badge badge-info">{{room.status.title}}</small>
			</h5>
			<h6 class="card-subtitle mb-2 text-muted">Appointment time: {{appointmentTime}} / Last update {{timeSinceLastUpdate}} ago</h6>

			<div class="row">
				<span class="col">{{room.appointment.first_name}} {{room.appointment.last_name}}</span>
				<span class="col">(D: {{room.appointment.doctor_title}})</span>
				<span class="col">(A: {{room.appointment.assistant}})</span>
			</div>
		</div>
	</div>

</template>

<script>
  import * as moment from 'moment';
  import * as momentDuration from 'moment-duration-format';

  momentDuration(moment);

	export default {
	  name: 'room-list-item',
    props: ['room'],
    data() {
      return {
        appointmentTime: moment(this.room.appointment.start_time, 'HH:mm').format('hh:mm A'),
        timeSinceLastUpdate: getTimeDiff(this.room.update_time)
      }
    }
	}

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
</script>
