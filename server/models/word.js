module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('word', {
    word: {
      type: DataTypes.STRING,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
  });
  return Word;
};
