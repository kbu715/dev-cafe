const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');

const router = express.Router();

// POST /user/login
router.post('/login', (req, res, next) => { // 미들웨어를 확장하는 방법
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.error(err);
      next(err);
    }
    if(info) {
      return res.status(401).send(info.reason); // 401 Unauthorized
    }
    return req.login(user, async (loginErr) => { // req.login() 동시에 실행되는게 passport/index -> serializeUser()
      if(loginErr) { // Passport error -> 살면서 볼 일 없을 것!
        console.error(loginErr);
        return next(loginErr);
      }
      // res.setHeader('Cookie', 'cxlhy') 
      return res.status(200).json(user);
    })
  })(req, res, next);
});

router.post('/user/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('logout success');
})

router.post('/', async (req, res, next) => {
  // POST /user/
  try {
    const exist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exist) {
      // 403: 금지의 의미를 갖고있다.
      return res.status(403).send('이미 사용중인 이메일입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send('ok'); // res.send('ok'); 웬만하면 status 값 같이 적어준다. // 201은 잘 생성된 것 까지 의미한다.
  } catch (error) {
    console.log(error);
    next(error); // status 500
  }
});

module.exports = router;
