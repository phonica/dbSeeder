const Promise = require('bluebird');
const Grapheme = require('./db').graphemes;
const GraphemeData = require('./seedData/graphemeData');
const Phoneme = require('./db').phonemes;
Promise.map(GraphemeData, function(grapheme) {
  Grapheme.create(grapheme).then((newGrapheme) => {
    return Promise.map(grapheme.phoneme, (phoneme) => {
      Phoneme.findAll({
        where: {
          id: phoneme,
        },
      }).then((ph) => {
        newGrapheme.setPhonemes(ph[0].dataValues.uuid);
      });
    });
  });
});
