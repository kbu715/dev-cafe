const express = require('express');
const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const multer = require('multer');
const path = require('path'); // node가 제공
const fs = require('fs'); // file system 조작할 수 있는 module.


const router = express.Router();

try {
  fs.accessSync('uploads'); // 'uploads' 폴더가 있는지 체크
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) { // 방루이.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 방루이
      done(null, basename + '_' + new Date().getTime() + ext); // 방루이_15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 1장만 올리겠다? upload.single() 쓰면 된다.
// text만 있다. json만 있다... 그러면 upload.none()
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { // POST /post/images
  console.log(req.files); // upload 된 이미지에 대한 정보들
  res.json(req.files.map(file => file.filename));
})

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // 로그인을 한번 하고 나서부터는 router에 접근할때 passport.deserializeUser() 가 자동실행
    })
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); // [[노드, true], [리액트, true]] // find 인지 create 인지 boolean 값으로 보여준다.
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) { // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else { // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
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
