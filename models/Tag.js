const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("Tag",{
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: { type: DataTypes.STRING, comment: "제목"}
    },
        {
            tableName: "Tag"
        }
    );

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Posts, {
            through: {
                model: "TagPosts",
                unique: false
            },
            as: "Posts",
            foreignKey: "tag_id",
            sourceKey: "id",
            constraints: false
        });
    };
    return Tag;
};