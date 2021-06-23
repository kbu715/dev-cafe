# nodebird

## Next.js project에 ESLint와 Prettier 설정하기

[https://www.kenrhee.com/blog/eslint-and-prettier-for-nextjs](https://www.kenrhee.com/blog/eslint-and-prettier-for-nextjs)

---

### target="_blank" rel="noreferrer noopener"

📵 보안에 위협이 될 수 있기 때문에 referrer와 opener에 대한 정보를 막아줘야 한다. (원래는 새창이 켜지면 이 정보들이 넘어간다고 한다)

---

찾아 볼 수 있는 것들은 외우지 마라.

---

### redux-thunk 이해하기

비동기 action을 dispatch 할 수 있도록 도와주는 미들웨어

```javascript

    const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

    function increment() {
        return {
            type: INCREMENT_COUNTER,
        }
    }
    // 원래의 redux에서는 아래가 실행 x. redux-thunk 가능.
    // redux의 확장!
    function incrementAsync() {
        return (dispatch) => {
            setTimeout(() => {
                // Can invoke sync or async actions with `dispatch`
                dispatch(increment());
            }, 1000);
        };
    }
```

🔎 redux-thunk 사용했을 경우

```javascript

// login action creator
// dispatch를 여러번 할 수 있게 해준다..
export const loginAction = (data) => {
    return (dispatch, getState) => {
        const state = getState(); // state = initialState
        dispatch(loginRequestAction());
        axios.post('/api/login')
            .then(res => {
                dispatch(loginSuccessAction(res.data));
            })
            .catch(error => {
                dispatch(loginFailureAction(error));
            })
    }
}

```

- 대부분의 요청들은 비동기이기 때문에 `Request`, `Success`, `Failure` 이 3단계가 존재한다.

### Middleware 이해하기

Middleware 특징

1. `3단 고차 함수` 화살표 3개를 가진다
2. 인자들은 다 주어지기 때문에 활용만 하면 된다.

간단한 커스텀 미들웨어를 만들어보자.
```javascript

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    // thunk는 type이 func인 action도 받는다.
    // if(typeof action === 'function') {
    //     return action(dispatch, getState);
    // }
    console.log(action);
    return next(action);
}

```
![image](https://user-images.githubusercontent.com/63832678/123110155-ca49dd80-d476-11eb-9739-696ed3805c3f.png)

---


### thunk 대신 saga를 쓰는 이유?

1. delay를 제공 (몇 초 뒤에 dispatch 실행 가능, thunk는 직접 구현.)
2. 클릭을 두번 한 경우 thunk는 두번 실행되지만, saga는 take latest? 마지막으로 들어온 요청만 실행 할 수 있게 해주는 기능이 있다.
3. 1초에 3번이상 action이 실행되면 차단하는 기능?!이 존재한다. 등등등 saga가 미리 구현해 놓았다.