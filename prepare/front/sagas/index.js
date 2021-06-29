import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true; // 중복 방지

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
