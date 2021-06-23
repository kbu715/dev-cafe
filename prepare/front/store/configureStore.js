import { createStore, compose, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducer from '../reducers';

const configureStore = () => {
  const loggerMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      console.log(action);
      return next(action);
    };

  // saga or thunk in array
  const middlewares = [thunkMiddleware, loggerMiddleware];

  // 중앙 데이터들이 어떻게 변하는지 다 보이기 때문에 보안에 취약할 수 있다.
  // 배포용일땐 DevTool 연결 하지 않는다.
  const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
