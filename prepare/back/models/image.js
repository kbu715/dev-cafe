module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.difine('Image', {
        // id 기본적으로 들어있다.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        cllate: 'utf8_general_ci', 
    });
    Image.associate = (db) => {};
    return Image;
}