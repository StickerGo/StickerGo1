import * as firebase from 'firebase';
const firebaseConfigPlayer = {
  apiKey: process.env.FIREBASE_USESRKEY,
  authDomain: 'promptsdatabase.firebaseapp.com',
  databaseURL: 'https://promptsdatabase.firebaseio.com',
  projectId: 'promptsdatabase',
  storageBucket: 'promptsdatabase.appspot.com',
  messagingSenderId: '399558208346',
};

firebase.initializeApp(firebaseConfigPlayer, 'Secondary');

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
      console.log('hello what is player', player);
      let counter = 1;

      const added = firebase
        .database()
        .ref()
        .child('player1')
        .set({
          draw: '',
          name: player.name,
          photo: '',
        });
      counter++;
      console.log('what is added', added);
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
