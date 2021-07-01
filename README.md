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


---

### generator 이해하기

![image](https://user-images.githubusercontent.com/63832678/123230611-65dc5c00-d512-11eb-93fd-0013a6743b99.png)

- yield 중단점 역할
- yield가 테스트할 때 사용하면 좋다.
- 한줄 한줄 실행하면서 테스트

#### <무한 반복 활용>

이런식으로도 활용 가능하다.
마치 `Event Listener` 처럼 활용 할 수 있다. (무한의 event listener)

![image](https://user-images.githubusercontent.com/63832678/123231670-5f9aaf80-d513-11eb-8108-4427accbe985.png)

📌 이 성질을 **saga**가 활용한 것

---

### takeLatest 클린 2번한 경우(요청 2번)

이미지 참고

![image](https://user-images.githubusercontent.com/63832678/123251020-b1e4cc00-d525-11eb-8ac5-b070fd676a91.png)

- 프론트에서 처음엔 1개의 글만 보이겠지만 새로고침을 하면 백엔드에 2개의 데이터가 존재하기 때문에 똑같은 글이 2개가 뜨는 문제가 있다.

- throttle 로 해결!

---

### immer
`npm install immer`

불변성을 다룰때 필수템!!!

npm install immer use-immer (immer의 hook ver.)

### redux toolkit

리덕스 코드량 줄여주는 툴.

### placeholder.com


### 인피니트 스크롤링 

- scrollY : 얼마나 내렸는지
- clientHeight : 화면 보이는 길이
- scrollHeight : 총 길이

### react-virtualized

인스타그램 같은 효과

virtualized list

### backend

`app.get` -> 가져오다
`app.post` -> 생성하다
`app.put` -> 전체 수정
`app.delete` -> 제거
`app.patch` -> 부분 수정
`app.options` -> 찔러보기? (서버야 요청보내면 받아줄 수 있어?)
`app.head` -> 헤더만 가져오기

애매하면 post 쓴다.

app.post('/login') 로그인은 post인가 get인가
app.post('/post') 게시글 가져오면서  조회수 1 올린다.

보통 프론트엔드 개발자와 백엔드 개발자가 합의를 한다 

`swagger` [https://swagger.io/](https://swagger.io/) 
api 문서 만들때 많이 쓴다.

---

### 시퀄라이즈 초기 세팅
npx sequelize init

### 시퀄라이즈 관계 설정

`hasMany`
`hasOne`
`belongsTo`
`belongsToMany`

#### 다 대 다 관계에서는 중간에 테이블이 임의로 생긴다.

post - hashtag => posthashtag
![image](https://user-images.githubusercontent.com/63832678/123513693-666b2300-d6c9-11eb-99bf-4e6b8515a762.png)

#### Post 리트윗 관계 설명

![image](https://user-images.githubusercontent.com/63832678/123514224-c7482a80-d6cc-11eb-82e3-5f590e559089.png)


### npx sequelize db:create

이 명령어 실행 먼저 하고 db sync 해준다.

### 프로그램 구조를 기억하자

![image](https://user-images.githubusercontent.com/63832678/123517529-6fb1bb00-d6dc-11eb-9b2d-e8751be27e30.png)

### POST PUT PATCH, data 넘길 수 있다.

아래 예시처럼 두번째 인자로 POST, PUT, PATCH는 data를 넘길 수 있다.
GET DELETE 는 안넘긴다.

```javascript
function signUpAPI(data) {
  return axios.post('http://localhost:3065/user', data);
}
```


### req / res

req/res 는 header(상태, 용량, 시간, 쿠키) 와
body(데이터)로 구성되어 있다.

### Header Status

200 성공
300 리다이렉트
400 클라이언트 에러
500 서버 에러

400번대 500번대 이렇게 분류한다.
403 에러는 클라이언트에서 잘못 보내서 생기는 에러


### HTTP 상태 코드

[https://developer.mozilla.org/ko/docs/Web/HTTP/Status](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)


### cookie와 session이 왜 필요한가?

백엔드 서버에서는 로그인 정보를 통째로 갖고있지만 (이 통째로 있는 게 session)

브라우저에서는 그대로 갖고있으면 보안상 위험이 존재하므로

Cookie로 'cxlhy' 와 같은 랜덤한 문자를 보내줘서 보안의 위협을 최소로한다.

![image](https://user-images.githubusercontent.com/63832678/123567301-c9110b80-d7fc-11eb-86c8-b143fc3f35ac.png)


- 백엔드 서버에서도 로그인 정보를 통째로 갖고 있으면 메모리에 부담이 되므로 passport가 id값만 Cookie에 매칭되도록 한다. 
- 나중에는 아예 세션 저장용 DB로 `redis`를 사용한다.

### 쿠키를 공유하게 된다면 보안이 더 강화되야 하기 때문에

```javascript
app.use(cors({
    origin: 'http://localhost:3060', 
    credentials: true, 
}));
```

- origin: '*' 는 위험하다.


### 로그인 정보 불러와서 새로고침 해도 로그인 된 상태로 남아 있게 했지만

서버 사이드 렌더링으로 미리 불러와서 로그인 된 상태로 만들게 할 필요가 있다.


### 서버로부터 프론트에 필요한 데이터만 보내주기! 데이터 효율성


### offset limit 단점

삭제전 20 19 18 17 16 15 14 13 12 11 / 10 9 8 7 6 5 4 3 2 1 
삭제후 20 19 18 17 16  14 13 12 11 / 10 / 9 8 7 6 5 4 3 2 1 

중간에 게시글을 추가하거나 삭제하면 꼬여버린다

15번을 중간에 삭제한다면 10번 게시글을 앞에서도 안불러오고 뒤에서도 안불러오는 대참사가 일어날 수 있다!!!


### limit / lastId 방식을 많이 쓴다.

### morgan

front에서 backend로 요청을 보낼때 log가 콘솔창에 뜬다.

어떤 요청이 왔는지 보여준다.

### Router는 실행순서가 중요하다

위에 같은 라우터가 있다면 밑에 라우터는 실행이 안된다.


### 작성하는 것과 삭제하는 것은 항상 보안을 철저히!

### reducer에서 loading 부분은 `SWR` 을 통해 반복을 줄일 수 있다.

araboza...