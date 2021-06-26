module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.difine('Comment', {
        // id 기본적으로 들어있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        cllate: 'utf8mb4_general_ci', // utf8mbf 이모티콘 저장
    });
    Comment.associate = (db) => {};
    return Comment;
}