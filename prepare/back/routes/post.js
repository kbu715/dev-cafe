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
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
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
      where: { id: parseInt(req.params.postId) }
    });

    if(!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.') // 403 : 금지
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId }
      });
      if(!post) {
        return res.status(403).send('게시글이 존재하지 않습니다.')
      }
      // if(post)
      await post.addLikers(req.user.id); // db 조작할 때는 항상 await
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
})

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if(!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.')
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/10
  // DELETE /post
  try {
    await Post.destroy({
      where: { 
        id: req.params.postId, 
        UserId: req.user.id 
      }, // 다른사람이 남의 글을 삭제할 수도 있는 문제! -> 조건을 하나 더 준다 UserId: req.user.id -> 내가 쓴 글만 삭제 가능!
    })
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
