const express = require('express');
const bcrypt = require('bcrypt');
const { User, Post, Image, Comment } = require('../models');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// POST /user/login
router.post('/login', isNotLoggedIn, (req, res, next) => { // 미들웨어를 확장하는 방법
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
      const fullUserWithoutPassword = await User.findOne({ 
        where: { id: user.id },
        attributes: {
          exclude: ['password'], // 비밀번호 제외하고 갖고오겠다.
        },
        include: [{ 
            model: Post,  // User <-> Post hasMany 관계라서 Post가 복수형이 되어 me.Posts가 된다.
            attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }
        ]
      });
      // res.setHeader('Cookie', 'cxlhy') 
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('logout success');
})

router.get('/', async (req, res, next) => { // GET /user // 내 로그인 정보 불러오기
    try {
      if(req.user) { 
        const fullUserWithoutPassword = await User.findOne({ 
          where: { id: req.user.id },
          attributes: {
            exclude: ['password'],
          },
          include: [{ 
              model: Post,
              attributes: ['id'], // 데이터 효율을 위해서, 숫자만 세면 되므로 id 속성만 갖고온다.
          }, {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          }, {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          }
          ]
        });
        res.status(200).json(fullUserWithoutPassword);
      } else {
        res.status(200).json(null);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
})

router.post('/', isNotLoggedIn, async (req, res, next) => { // 회원가입
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
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok'); // res.send('ok'); 웬만하면 status 값 같이 적어준다. // 201은 잘 생성된 것 까지 의미한다.
  } catch (error) {
    console.log(error);
    next(error); // status 500
  }
});



router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
  try {
    const user = await User.findOne({ where: { id: req.user.id }}); // 나를 먼저 찾고
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/2
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      res.status(403).send('없는 사람을 차단하려고 하시네요?');
    }
    await user.removeFollowings(req.user.id); // 2번 유저의 팔로잉 목록에서 나를 지운다.
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname,
    }, {
      where: { id: req.user.id },
    })
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if(!user) {
      res.status(403).send('팔로우할 유저가 존재하지 않습니다.')
    }
    await user.addFollowers(req.user.id) // 내가 그사람의 팔로워가 되는 것!!!
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if(!user) {
      res.status(403).send('언팔로우할 유저가 존재하지 않습니다.')
    }
    await user.removeFollowers(req.user.id); 
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/:userId', async (req, res, next) => { // GET /user/1
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    })
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId/posts', async (req, res, next) => { // GET /user/1/posts
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
          order: [['createdAt', 'DESC']],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});



module.exports = router;

