module.exports = (sequelize, DataTypes) => {
  const Grapheme = sequelize.define('grapheme', {
    grapheme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
  });
  return Grapheme;
};
