import db from './firebase';

//action types

const GET_ALL_ROOMS = 'GET_ALL_ROOMS';
const GET_ONE_ROOM = 'GET_ONE_ROOM';
const MAKE_ONE_ROOM = 'MAKE_ONE_ROOM';

//action creators
const getAll = rooms => {
  return { type: GET_ALL_ROOMS, rooms };
};
const getOne = room => {
  return { type: GET_ONE_ROOM, room };
};
const makeOne = room => {
  return { type: MAKE_ONE_ROOM, room };
};

// thunk creators
export const getAllRooms = () => {
  return dispatch => {
    try {
      db.database()
        .ref('rooms')
        .on('value', function(snapshot) {
          const rooms = snapshot.val() || [];
          dispatch(getAll(rooms));
        });
    } catch (err) {
      console.error('THUNK WRONG WITH GET ALL ROOMS', err);
    }
  };
};

export const getOneRoom = roomId => {
  return dispatch => {
    db.database()
      .ref('rooms')
      .child(roomId)
      .on('value', function(snapshot) {
        const room = snapshot.val() || [];
        console.log('PASS ROOM', room.id);
        dispatch(getOne(room));
      });
  };
};

export const createRoom = roomInfo => {
  return dispatch => {
    const room = db
      .database()
      .ref('rooms')
      .push();
    roomInfo.id = room.key;
    room.set(roomInfo);
    dispatch(makeOne(roomInfo));
  };
};

//reducer

const initialStateRoom = {
  rooms: [],
  room: {},
};

const roomReducer = (state = initialStateRoom, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
      };
    case GET_ONE_ROOM:
      return {
        ...state,
        room: action.room,
      };
    case MAKE_ONE_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.room],
        room: action.room,
      };
    default:
      return state;
  }
};

export default roomReducer;
