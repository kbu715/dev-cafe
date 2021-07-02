const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const where = {};
        if(parseInt(req.query.lastId, 10)) { //초기 로딩이 아닐때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } // lastId 보다 작은 // lt: less than // Op : Operator 연산자, 시퀄라이즈 제공.
        }

        const posts = await Post.findAll({
            // limit: 10, // 10개만 가져와라
            // offset: 0, // 1~10 가져온다.
            // order: [['createdAt', 'DESC]], // 최신글 부터 내림차순
            /*********************/
            where,
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
            }, {
                model: User,
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