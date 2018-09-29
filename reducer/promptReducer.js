const GET_ONE = 'GET_ONE';
const getOne = prompt => {
  return { type: GET_ONE, prompt };
};

const initialState = { prompt: '' };

export const promptReducer = (state = initialState, action) => {
  if (action.type === GET_ONE) {
    return {
      prompt: action.prompt,
    };
  } else {
    return state;
  }
};
