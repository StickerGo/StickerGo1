import db from './firebase';

//action types

const GET_ALL = 'GET_ALL';
const GET_WINNER = 'GET_WINNER';
const ADD_PLAYER = 'ADD_PLAYER';
const ADD_DRAW = 'ADD_DRAW';
const ADD_PHOTO = 'ADD_PHOTO';
const UPDATE_PLAYER = 'UPDATE_PLAYER';
const GET_ALL_DRAW = 'GET_ALL_DRAW';
const GET_PHOTO = 'GET_PHOTO';
const PLAYER_RESET_GAME = 'PLAYER_RESET_GAME';
const PLAYER_EXIT_GAME = 'PLAYER_EXIT_GAME';

//action creators
const getAll = players => {
  return { type: GET_ALL, players };
};

const getOne = winner => {
  return { type: GET_WINNER, winner };
};

const addPlayer = player => {
  return {
    type: ADD_PLAYER,
    player,
  };
};
const addDraw = drawing => {
  return {
    type: ADD_DRAW,
    drawing,
  };
};

const updatedPlayer = player => {
  return {
    type: UPDATE_PLAYER,
    player,
  };
};

export const playerExitGame = () => {
  return { type: PLAYER_EXIT_GAME };
};

// thunk creators
export const getAllPlayers = () => {
  return dispatch => {
    try {
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

export const getWinner = playerId => {
  return dispatch => {
    try {
      db.database()
        .ref('/players')
        .child(playerId)
        .on('value', snapshot => {
          const winner = snapshot.val() || [];
          dispatch(getOne(winner));
        });
    } catch (err) {
      console.error('THUNK WRONG WITH GET WINNER', err);
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

export const addDrawing = (drawing, playerId) => {
  return async dispatch => {
    try {
      db.database()
        .ref('players')
        .child(`/${playerId}/draw`)
        .set(drawing)
        .then(() => {
          dispatch(addDraw(drawing));
        });
    } catch (err) {
      console.error('THUNK WRONG', err);
    }
  };
};

const updatePlayer = playerId => {
  return async dispatch => {
    try {
      db.database()
        .ref('/players')
        .child(playerId)
        .on('value', snapshot => {
          const player = snapshot.val() || [];
          dispatch(updatedPlayer(player));
        });
    } catch (err) {
      console.error('THUNK WRONG', err);
    }
  };
};

export const addPhoto = (photo, playerId) => {
  return async dispatch => {
    try {
      db.database()
        .ref('players')
        .child(`/${playerId}/photo`)
        .set(photo)
        .then(() => {
          dispatch(updatePlayer(playerId));
        });
    } catch (err) {
      console.error('THUNK WRONG', err);
    }
  };
};

//reducer
const initialStatePlayer = {
  players: [],
  player: {},
  winner: {},
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
    case UPDATE_PLAYER:
      return {
        ...state,
        player: action.player,
      };
    case GET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case PLAYER_EXIT_GAME:
      return initialStatePlayer;
    default:
      return state;
  }
};

export default playerReducer;
