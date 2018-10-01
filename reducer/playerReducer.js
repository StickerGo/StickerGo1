import * as firebase from 'firebase';
import ApiKeys from '../constants/ApiKeys'


firebase.initializeApp(ApiKeys.FirebaseConfig, 'Secondary');

//action types

const GET_ALL = 'GET_ALL';
const ADD_PLAYER = 'ADD_PLAYER';
const ADD_DRAW = 'ADD_DRAW';
const ADD_PHOTO = 'ADD_PHOTO';
const GET_ALL_DRAW = 'GET_ALL_DRAW';
const GET_ALL_PHOTO = 'GET_ALL_PHOTO';

//action creators
const getAll = () => {
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

export const FBAddPlayer = player => {
  return async dispatch => {
    try {
      console.log('beginning FBAddPlayer', player);
      let counter = 1;

      const added = firebase
        .database()
        .ref('stickergo-capstone')
        // .child('player1')
        .push({
          draw: '',
          name: player.name,
          photo: '',
        })
        .then(newPlayer => {
          console.log('in the then statement', newPlayer)
          dispatch(addPlayer(newPlayer))
        })
      counter++;
      console.log('after player is added:', added);
      dispatch(addPlayer(added));
    } catch (err) {
      console.error('THUNK WRONG', err);
    }
  };
};

//reducer
const initialStatePlayer = {
  players: [],
  player: {
    name: '',
    draw: '',
    photo: '',
  },
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
      };
    // case ADD_DRAW:
    // return {
    //   ...state,
    //   draws: [...state.draws, action.draw],
    // };

    default:
      return state;
  }
};

export default playerReducer;
