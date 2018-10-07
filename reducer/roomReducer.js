import db from './firebase';

//action types

const GET_ALL_ROOMS = 'GET_ALL_ROOMS';
const GET_ONE_ROOM = 'GET_ONE_ROOM';
const MAKE_ONE_ROOM = 'MAKE_ONE_ROOM';
const ADD_TO_ROOM = 'ADD_TO_ROOM';
const GET_ALL_IN_ROOM = 'GET_ALL_IN_ROOM';
const GOT_IMAGES = 'GOT_IMAGES'

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
  console.log('in the action creator', image)
  return { type: GOT_IMAGES, image }
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

// export const getImages = (arrIds) => {
//   return async dispatch => {
//     const test = []
//     const imagesPromises = await arrIds.map(async player => {
//       const jessIsAwesome = db
//         .database()
//         .ref('players')
//         .child(player)
//         .child('photo')
//         .on('child_added', s => {
//           console.log('what is s?', s.val())
//           const image = s.val()
//           console.log('what is typeof s?', typeof s)
//           console.log('what is image?', image)
//           console.log('what is typeof image?', typeof image)
//           test.push(image)
//           return s.val()
//         });
//       console.log('hmmm', test)
//       console.log('what is jessisAwesome', jessIsAwesome)
//       return jessIsAwesome;
//       // return test
//     });
//     console.log('hmmm', test)
//     console.log('images promises', imagesPromises)
//     const arrOfImages = Promise.all(test)
//     console.log('in the thunk creater', arrOfImages)
//     dispatch(gotImages(imagesPromises))
//   }
// }
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

//reducer

const initialStateRoom = {
  rooms: [],
  room: {},
  playersInRoom: [],
  images: []
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
    default:
      return state;
  }
};

export default roomReducer;
