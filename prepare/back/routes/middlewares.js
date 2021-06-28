exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) { // provided by passport
        next(); // 다음 미들웨어로 이동. 하지만 next(err) 라면 에러처리 미들웨어로 이동. (app.js에 내부적으로 존재)
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) { // provided by passport
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
}

// 이렇게 따로 정리한 이유는 중복 제거 목적!