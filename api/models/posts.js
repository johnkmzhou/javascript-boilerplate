module.exports = (sequelize, DataTypes) => {
  return sequelize.define('posts', {
    id: { type: DataTypes.INTEGER(11), primaryKey: true, field: 'id' },
    post: { type: DataTypes.TEXT, field: 'post' },
    userId: { type: DataTypes.INTEGER(11), field: 'user_id' },
    publishedAt: { type: DataTypes.DATE, field: 'published_at' },
  });
};
