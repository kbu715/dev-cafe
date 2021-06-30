const express = require('express');
const { Post, User, Image, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const posts = await Post.findAll({
            // limit: 10, // 10개만 가져와라
            // offset: 0, // 1~10 가져온다.
            // order: [['createdAt', 'DESC]], // 최신글 부터 내림차순
            /*********************/

            limit: 10,
            order: [['createdAt', 'DESC'], [Comment, 'createdAt', 'DESC']], // 2차원 배열 // 앞에 배열은 게시글 정렬 // Comment만 따로 정렬
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
                }]
            }],
        })
        res.status(200).json(posts);        
    } catch (error) {
        console.error(error);
        next(error);
    }

});

module.exports = router;


// 실무에서는 limit, offset 방법을 많이 안쓴다.
// 치명적인 단점이 있다
// READMEㄱㄱ