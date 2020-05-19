module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    id: { type: DataTypes.INTEGER(11), primaryKey: true, field: 'id' },
    username: {
      type: DataTypes.STRING(50),
      field: 'username',
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Missing username.',
        },
        notEmpty: { msg: 'Missing username.' },
      },
    },
    password: {
      type: DataTypes.STRING(50),
      field: 'password',
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Missing password.',
        },
        notEmpty: { msg: 'Missing password.' },
      },
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
  });
};
