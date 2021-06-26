module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.difine('Post', {
        // id 기본적으로 들어있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // RetweetId
    }, {
        charset: 'utf8mb4',
        cllate: 'utf8mb4_general_ci', // utf8mbf 이모티콘 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // 게시글의 좋아요 와 사용자의 관계
        // 나중에 as에 따라서 post.getLikers처럼 게시글 좋아요 누른 사람을 가져오게 된다.
        // as 별칭
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 어떤 게시글이 어떤 게시글의 리트윗 게시글
    };
    return Post;
}