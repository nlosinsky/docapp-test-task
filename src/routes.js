import RoomList from './components/rooms-list/RoomList.vue';
import RoomDetails from './components/room-details/RoomDetails.vue';

const routes = [
  { path: '/', component: RoomList },
  { path: '/room/:id', component: RoomDetails },
];

export default routes;
