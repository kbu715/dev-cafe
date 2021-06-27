const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const cors = require('cors');
const passportConfig = require('./passport');

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('🌈  DB Connected 🌈');
  })
  .catch(console.error);

passportConfig();

app.use(cors({
    origin: '*',
}));
// front에서 보낸 data를 req.body에 넣어주는 역할을 한다.
// router보다 위에 위치 시켜야 먼저 설정을 한다.
app.use(express.json()); // front에서 json 형식으로 data를 보내면 req.body에 json 형태로 넣어준다.
app.use(express.urlencoded({ extended: true })); // Form Submit 했을 때 urlencoded 방식으로 데이터가 넘어온다.

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => console.log(`🌈 Server is running`));

// app.use('/post', postRouter);

// post가 prefix로 붙는다.
