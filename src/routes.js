import RoomList from './components/rooms-list/rooms-list';
import RoomDetails from './components/room-details/room-details';

const routes = [
  { path: '/', component: RoomList },
  { path: '/room/:id', component: RoomDetails },
];

export default routes;
