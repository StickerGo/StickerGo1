import db from './firebase';

//action types

const GET_ALL_ROOMS = 'GET_ALL_ROOMS';
const GET_ONE_ROOM = 'GET_ONE_ROOM';
const MAKE_ONE_ROOM = 'MAKE_ONE_ROOM';
const ADD_TO_ROOM = 'ADD_TO_ROOM';
const GET_ALL_IN_ROOM = 'GET_ALL_IN_ROOM';
const GOT_IMAGES = 'GOT_IMAGES'
const GOT_NUM_PLAYERS = 'GOT_NUM_PLAYERS'

//action creators

const getAllInRoom = playersInRoom => {
  return { type: GET_ALL_IN_ROOM, playersInRoom };
};
const getAll = rooms => {
  return { type: GET_ALL_ROOMS, rooms };
};
const getOne = room => {
  return { type: GET_ONE_ROOM, room };
};
const makeOne = room => {
  return { type: MAKE_ONE_ROOM, room };
};
const addPlayerToRoom = room => {
  return { type: ADD_TO_ROOM, room };
};

const gotImages = image => {
  return { type: GOT_IMAGES, image }
}

const gotNumPlayers = num => {
  return { type: GOT_NUM_PLAYERS, num }
}

// thunk creators
export const getAllRooms = () => {
  return dispatch => {
    try {
      db.database()
        .ref('rooms')
        .on('value', function (snapshot) {
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
      .on('value', function (snapshot) {
        const room = snapshot.val() || [];
        dispatch(getOne(room));
      });
  };
};


export const getPlayersinRoom = roomId => {
  return async dispatch => {
    try {
      let temp = [];
      const dbplayers = await db
        .database()
        .ref('rooms')
        .child(roomId)
        .child('players')
        .once('value');
      temp = dbplayers.val();

      let keysArr = Object.keys(temp);

      dispatch(getAllInRoom(keysArr));
    } catch (err) {
      console.error('THERE IS ERROR WITH PLAYERS IN ROOM', err);
    }
  };
};

export const createRoom = roomInfo => {
  return dispatch => {
    const room = db
      .database()
      .ref('rooms')
      .child(roomInfo.id)
      .set(roomInfo);
    dispatch(makeOne(roomInfo));
  };
};

export const addToRoom = (playerId, playerName, roomId) => {
  return dispatch => {
    return db
      .database()
      .ref('rooms')
      .child(roomId)
      .child('players')
      .child(playerId)
      .set({ name: playerName, votes: 0 })
      .then(() => {
        dispatch(getOneRoom(roomId));
      });
  };
};

export const getImages = (id) => {
  return dispatch => {
    db.database()
      .ref('players')
      .child(id)
      .child('photo')
      .on('value', function (snapshot) {
        const image = snapshot.val()
        if (image !== '') {
          dispatch(gotImages(image))
        }
      })
  }
}

export const getNumPlayers = (id) => {
  return dispatch => {
    db.database()
      .ref('rooms')
      .child(id)
      .child('numPlayers')
      .on('value', function (snapshot) {
        const num = snapshot.val()
        dispatch(gotNumPlayers(num))
      })
  }
}

//reducer

const initialStateRoom = {
  rooms: [],
  room: {},
  playersInRoom: [],
  images: [],
  num: ''
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
    case ADD_TO_ROOM:
      return {
        ...state,
        room: action.room,
      };
    case GET_ALL_IN_ROOM:
      return {
        ...state,
        playersInRoom: action.playersInRoom,
      };
    case GOT_IMAGES:
      return {
        ...state,
        images: [...state.images, action.image]
      }
    case GOT_NUM_PLAYERS:
      return {
        ...state,
        num: action.num
      }
    default:
      return state;
  }
};

export default roomReducer;
