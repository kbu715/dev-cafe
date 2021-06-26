module.exports = (sequelize, DataTypes) => {
    const User = sequelize.difine('User', { // MySQL 에는 users 테이블 생성
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
    User.associate = (db) => {};
    return User;
}