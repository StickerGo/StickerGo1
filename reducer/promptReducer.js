import db from './firebase';

//action types

const GET_ALL_PROMPTS = 'GET_ALL_PROMPTS';
const GET_ONE_PROMPT = 'GET_ONE_PROMPT';

//action creators
const getAll = prompts => {
  return { type: GET_ALL_PROMPTS, prompts };
};
const getOne = prompt => {
  return { type: GET_ONE_PROMPT, prompt };
};

// thunk creators
export const getAllPrompts = () => {
  return dispatch => {
    try {
      db.database()
        .ref('prompts')
        .on('value', function(snapshot) {
          const prompts = snapshot.val() || [];

          dispatch(getAll(prompts));
        });
    } catch (err) {
      console.error('THUNK WRONG WITH GET ALL PROMPTS', err);
    }
  };
};

export const getOnePrompt = roomId => {
  return dispatch => {
    db.database()
      .ref('rooms')
      .child(roomId)
      .on('value', function(snapshot) {
        const room = snapshot.val() || [];
        const prompt = room.promptForRoom;
        dispatch(getOne(prompt));
      });
  };
};

//reducer

const initialState = { prompts: [], prompt: '' };

const promptReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROMPTS:
      return {
        ...state,
        prompts: action.prompts,
      };
    case GET_ONE_PROMPT:
      return {
        ...state,
        prompt: action.prompt,
      };
    default:
      return state;
  }
};

export default promptReducer;
