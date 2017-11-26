const db = require('./db');
db.sequelize.sync({force: true}).then(() => {
  console.log('synced DB and dropped old data');
});
