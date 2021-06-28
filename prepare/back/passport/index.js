const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {

        done(null, user.id); // id값만 Cookie와 연결해주는 역할.

    });

    passport.deserializeUser(async (id, done) => {
        try { // id를 통해서 DB에서 user 정보를 복구하는 과정
            const user = await User.findOne({ where: { id }});
            done(null, user); // req.user에 저장
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();

}