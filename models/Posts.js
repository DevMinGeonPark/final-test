const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
        title : { type: DataTypes.STRING, comment: "제목"},
        contects : { type: DataTypes.TEXT, comment: "내용"} 
    },
        {
            tableName: "Posts"
        }
    );

    Posts.associate = (models) => {
        Posts.belongsToMany(models.Tag, {
            through: {
                model: "TagPosts",
                unique: false
            },
            as: "Tag",
            foreignKey: "post_id",
            sourceKey: "id",
            constraints: false
        });
    };
    Posts.prototype.dateFormat = (date) => moment(date).format("YYYY-MM-DD");

    return Posts;
};