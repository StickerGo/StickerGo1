import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import promptReducer from './promptReducer';

const rootReducer = combineReducers({
  players: playerReducer,
  prompts: promptReducer,
});

export default rootReducer;
