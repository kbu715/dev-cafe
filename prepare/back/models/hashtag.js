module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.difine('Hashtag', {
        // id 기본적으로 들어있다.
        name: {
            type: DataTypes.STRING(20), // 20글자 제한
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        cllate: 'utf8mb4_general_ci', // utf8mbf 이모티콘 저장
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post);

    };
    return Hashtag;
}