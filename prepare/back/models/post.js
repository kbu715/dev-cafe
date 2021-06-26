module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.difine('Post', {
        // id 기본적으로 들어있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        cllate: 'utf8mb4_general_ci', // utf8mbf 이모티콘 저장
    });
    Post.associate = (db) => {};
    return Post;
}