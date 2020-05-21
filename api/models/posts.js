module.exports = (sequelize, DataTypes) => {
  return sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    post: {
      type: DataTypes.TEXT,
      field: 'post',
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Missing post.',
        },
        notEmpty: { msg: 'Missing post.' },
      },
    },
    userId: { type: DataTypes.INTEGER(11), field: 'user_id', allowNull: false },
    publishedAt: {
      type: DataTypes.DATE,
      field: 'published_at',
      allowNull: false,
    },
  });
};
