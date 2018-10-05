import db from './firebase';

//action types
let count = 0;

const ADD_PLAYER = 'ADD_PLAYER';
const ADD_DRAW = 'ADD_DRAW';
const ADD_PHOTO = 'ADD_PHOTO';
const GET_ALL_DRAW = 'GET_ALL_DRAW';
const GET_ALL_PHOTO = 'GET_ALL_PHOTO';
const GET_ALL = 'GET_ALL';

//action creators
const getAll = players => {
  return { type: GET_ALL, players };
};

const addPlayer = player => {
  return {
    type: ADD_PLAYER,
    player,
  };
};
const addDraw = draw => {
  return {
    type: ADD_DRAW,
    draw,
  };
};

const addPhoto = photo => {
  return {
    type: ADD_PHOTO,
    photo,
  };
};

// thunk creators
export const getAllPlayers = () => {
  return dispatch => {
    try {
      console.log('beginning getAllPlayers');
      db.database()
        .ref('/players')
        .on('value', snapshot => {
          const players = snapshot.val() || [];
          dispatch(getAll(players));
        });
    } catch (err) {
      console.error('THUNK WRONG WITH GET ALL PLAYERS', err);
    }
  };
};

export const FBAddPlayer = player => {
  return async dispatch => {
    try {
      const added = db
        .database()
        .ref('players')
        .child(player.id)
        .set(player);

      dispatch(addPlayer(player));
    } catch (err) {
      console.error('THUNK WRONG', err);
    }
  };
};

//reducer
const initialStatePlayer = {
  players: [],
  player: {},
  playersInRoom: [],
};

const playerReducer = (state = initialStatePlayer, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        players: action.players,
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
        player: action.player,
      };
    default:
      return state;
  }
};

export default playerReducer;
