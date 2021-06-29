const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


db.sequelize
  .sync()
  .then(() => {
    console.log('🌈  DB Connected 🌈');
  })
  .catch(console.error);

passportConfig();

app.use(cors({
    origin: 'http://localhost:3060', // origin: true, 해도 된다. 
    credentials: true, //access - control - allow - credentials : true // 쿠키를 전달하고자 한다면 이 설정을
}));
// front에서 보낸 data를 req.body에 넣어주는 역할을 한다.
// router보다 위에 위치 시켜야 먼저 설정을 한다.
app.use(express.json()); // front에서 json 형식으로 data를 보내면 req.body에 json 형태로 넣어준다.
app.use(express.urlencoded({ extended: true })); // Form Submit 했을 때 urlencoded 방식으로 데이터가 넘어온다.

// session 관련
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET, // Cookie 만들 때 시크릿 키와 login user data로 만드는데, 나중에 Cookie를 시크릿 키로 복원 가능.
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

//에러처리 미들웨어 직접 적어줄 수도 있다.
/*
app.use((err, req, res, next) => {

});
*/

app.listen(3065, () => console.log(`🌈 Server is running`));

// app.use('/post', postRouter);

// post가 prefix로 붙는다.
