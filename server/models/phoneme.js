module.exports = (sequelize, DataTypes) => {
  const Phoneme = sequelize.define('phoneme', {
    phoneme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    id: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    uniCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vowel: {
      type: DataTypes.BOOLEAN,
      allNull: false,
    },
  });
  return Phoneme;
};
