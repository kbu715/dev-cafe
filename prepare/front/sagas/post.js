import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
