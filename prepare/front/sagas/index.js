import { all, call, fork, put, takeLatest, throttle } from 'redux-saga/effects';
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
  yield throttle('LOG_IN_REQUEST', login, 2000);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST');
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST');
}

export default function* rootSaga() {
  // 1️⃣
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}

// all : 배열을 받는다. 배열안에 들어있는 것들을 동시에 실행해준다.

// take : 인자로 받은 action이 실행될 때까지 기다리겠다.
// 하지만 단 한번만 실행된다. 그래서 while(true)로 감싸는 방법이 있다.
// takeEvery로 while(true) 대신할 수 있다.

// 여기서 차이점!!
// while take는 동기적으로 동작하지만
// takeEvery는 비동기적으로 동작

// 실수로 두번 클릭하는 거 방지하기 위해서
// 보통은 takeEvery 보다 takeLatest 많이 쓴다.
// 완료된건 그냥 나두고 동시에 로딩중인 거 중에 마지막 것만 실행한다.

// 조금 더 자세하게 들어가보면
// takeLatest는 요청이 두번 들어가면 요청을 취소하는게 아니라
// 응답을 취소해서 응답이 하나만 오게 만든다.
// 하지만 프론트에서 처음엔 1개의 응답만 보이겠지만 새로고침을 하면 백엔드에 2개의 데이터가 존재하기 때문에 똑같은 응답이 2개가 뜨는 문제가 있다.
// 이 문제를 해결하기 위해 throttle? 이 존재한다.

// throttle : 특정 시간 안에서는 1번만 요청이 가게 만든다.
// 특수한 상황 아니면 그냥 takeLatest 쓰자.
// 대신 서버쪽에서 2번의 동일 요청이 오면 막도록 한다.
// 요청이 DDOS가 될만큼 많이 오는 경우가 있다면 throttle 써야지 뭐...
// 보통은 프론트에서 takeLatest 쓴다.

// fork : 비동기 함수 호출
// call : 동기 함수 호출 (await 와 같은 기능)

// put : dispatch 역할

// 1️⃣ - 2️⃣ -3️⃣ - 4️⃣ - (5️⃣ OR 6️⃣) 순서 참조

// 알아 둘 것
// 1. 전체적인 흐름
// 2. 이펙트의 원리
// 3. 제너레이터의 원리
