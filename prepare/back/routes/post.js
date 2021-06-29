const express = require('express');
const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  // POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // 로그인을 한번 하고 나서부터는 router에 접근할때 passport.deserializeUser() 가 자동실행
    })
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
      }, {
        model: User,
      }]
    })
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // :postId 동적으로 바뀌는 파라미터
  // POST /post
  try {
    // 없는 게시글에 댓글을 달 수 있기 때문에
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });

    if(!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.') // 403 : 금지
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    })
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => {
  // DELETE /post
  res.json({ id: 1 });
});

module.exports = router;
