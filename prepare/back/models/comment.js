module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        // id 기본적으로 들어있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // belongsTo 때문에 컬럼이 실제로 생긴다. 적어주지 않아도 생긴다.
        // UserId: 1,
        // PostId: 3
    }, {
        charset: 'utf8mb4',
        cllate: 'utf8mb4_general_ci', // utf8mbf 이모티콘 저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}