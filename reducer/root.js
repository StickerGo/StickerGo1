import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import promptReducer from './promptReducer';
import roomReducer from './roomReducer';

const rootReducer = combineReducers({
  players: playerReducer,
  prompts: promptReducer,
  rooms: roomReducer,
});

export default rootReducer;
