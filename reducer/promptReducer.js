import db from './firebase';

//action types

const GET_ALL = 'GET_ALL';
const GET_ONE = 'GET_ONE';

//action creators
const getAll = prompts => {
  return { type: GET_ALL, prompts };
};
const getOne = prompt => {
  return { type: GET_ONE, prompt };
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

export const getOnePrompt = () => {
  return dispatch => {
    db.database()
      .ref('prompts')
      .on('value', function(snapshot) {
        const prompts = snapshot.val() || [];
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        console.log('its working', prompt);
        dispatch(getOne(prompt));
      });
  };
};

//reducer

const initialState = { prompts: [], prompt: '' };

const promptReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        prompts: action.prompts,
      };
    case GET_ONE:
      return {
        ...state,
        prompt: action.prompt,
      };
    default:
      return state;
  }
};

export default promptReducer;
