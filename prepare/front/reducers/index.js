const initialState = {
  name: 'paul',
  age: 31,
  password: 'babo',
};

// const changeNickname = {
//   type: 'CHANGE_NICKNAME',
//   data: 'boogi',
// };

// action을 동적으로 만들어주는 함수를 생성해보자.
// action creator
/*
const changeNickname = (data) => {
  return {
    type: 'CHANGE_NICKNAME',
    data,
  };
};
*/

// dispatch process ✔

// store.dispatch(changeNickname('aaa'));

// reducer is function
// (previous state, action) => next state
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        name: action.data,
      };
  }
};

export default rootReducer;
