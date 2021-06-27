const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

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
