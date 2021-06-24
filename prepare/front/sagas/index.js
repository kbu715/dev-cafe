import { all, call, fork, put, take } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI(data) {
  // 4️⃣
  return axios.post('/api/login', data);
}

// action이 매개변수로 전달이 된다.
function* login(action) {
  // 3️⃣
  try {
    // loginAPI(action.data) === call(loginAPI, action.data)
    const result = yield call(loginAPI, action.data);
    // 5️⃣
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    // 6️⃣
    yield put({
      type: 'LOG_IN_FAILURE',
      data: error.response.data,
    });
  }
}

// LOG_IN action이 들어오면 login generator function을 실행.
// 이벤트 리스너 같은 역할

function* watchLogIn() {
  // 2️⃣
  while (true) {
    yield take('LOG_IN_REQUEST', login);
  }
}

function* watchLogOut() {
  while (true) {
    yield take('LOG_OUT_REQUEST');
  }
}

function* watchAddPost() {
  while (true) {
    yield take('ADD_POST_REQUEST');
  }
}

export default function* rootSaga() {
  // 1️⃣
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}

// all : 배열을 받는다. 배열안에 들어있는 것들을 동시에 실행해준다.

// take : 인자로 받은 action이 실행될 때까지 기다리겠다.
// 하지만 단 한번만 실행된다. 그래서 while(true)로 감싸는 방법이 있다.
// while(true) -> 보통의 경우 컴퓨터가 먹통이 된다. 하지만 generator에서
// 한번 실행하고 멈추고, 다음을 기다린다.
// 진정한 이벤트 리스너처럼 동작을 한다.

// fork : 비동기 함수 호출
// call : 동기 함수 호출 (await 와 같은 기능)

// put : dispatch 역할

// 1️⃣ - 2️⃣ -3️⃣ - 4️⃣ - (5️⃣ OR 6️⃣) 순서 참조

// 알아 둘 것
// 1. 전체적인 흐름
// 2. 이펙트의 원리
// 3. 제너레이터의 원리
