// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
const CardSet = require('./db').cardSets;
const Flashcard = require('./db').flashcards;
const Grapheme = require('./db').graphemes;
const flashcardData = require('./seedData/flashcardData');
Promise.map(flashcardData, function(card) {
  Flashcard.create(card).then((newCard) => {
    return Grapheme.findAll({
      where: {
        grapheme: card.grapheme,
      },
    })
      .then((grapheme) => {
        newCard.setGrapheme(grapheme[0].dataValues.uuid);
      })
      .then(() => {
        return CardSet.findAll({
          where: {
            name: card.cardSet,
          },
        }).then((set) => {
          newCard.setCard_set(set[0].dataValues.uuid);
        });
      });
  });
});
