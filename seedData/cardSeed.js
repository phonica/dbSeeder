const Promise = require('bluebird');
const CardSet = require('./db').cardSets;
const PhonicScheme = require('./db').phonicSchemes;
const cardSetData = require('./seedData/cardSetData');
Promise.map(cardSetData, function(set) {
  CardSet.create(set).then((newSet) => {
    return PhonicScheme.findAll({
      where: {
        name: set.phonicScheme,
      },
    }).then((scheme) => {
      newSet.setPhonic_scheme(scheme[0].dataValues.uuid);
    });
  });
});
