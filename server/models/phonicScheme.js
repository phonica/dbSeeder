module.exports = (sequelize, DataTypes) => {
  const PhonicScheme = sequelize.define('phonic_scheme', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return PhonicScheme;
};
