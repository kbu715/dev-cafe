module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL 에는 users 테이블 생성
        // id 기본적으로 들어있다.
        email: {
            // Column에 대한 정보들 
            type: DataTypes.STRING(30), // STRING, TEXT, INTEGER, BOOLEAN, FLOAT, DATETIME
            allowNull: false, // 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
        },
        password: {
            type: DataTypes.STRING(100), // Password는 암호화를 하기 때문에 넉넉하게 100으로
            allowNull: false, // 필수
        },
    }, {
        charset: 'utf8',
        cllate: 'utf8_general_ci', // 한글 저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 사용자와 게시글의 좋아요 관계 // 중간테이블 이름 지정해줄 수 있다. 'Like'
        // as: 'Liked' => 내가 좋아요를 누른 게시글들
        // as 별칭
        // through 중간 테이블 이름

        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
        // foreignKey 중간 테이블의 컬럼 이름을 바꿔준다.
    };
    return User;
}