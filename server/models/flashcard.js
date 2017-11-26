module.exports = (sequelize, DataTypes) => {
  const Flashcard = sequelize.define('flashcard', {
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    phase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return Flashcard;
};
