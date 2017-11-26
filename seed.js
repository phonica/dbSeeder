const db = require('./db');
// const Rx = require('rxjs/Rx');
// importing Bluebird promises so we can Promise.map
const Promise = require('bluebird');
const Phoneme = require('./db').phonemes;
const CardSet = require('./db').cardSets;
const Flashcard = require('./db').flashcards;
const Grapheme = require('./db').graphemes;
const Word = require('./db').words;
const PhonicScheme = require('./db').phonicSchemes;
const GraphemeData = require('./seedData/graphemeData');
const PhonemeData = require('./seedData/phonemeData');
const flashcardData = require('./seedData/flashcardData');
const cardSetData = require('./seedData/cardSetData');
// const wordData = require('./seedData/vocaWords');
const SchemeData = require('./seedData/schemeData');

// an array of grapheme entries
// an array of Phoneme entries

// Sync and restart db before seeding
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('synced DB and dropped old data');
  })
  .then(() => {
    return Promise.map(PhonemeData, function(phoneme) {
      return Phoneme.create(phoneme);
    });
  })
  .then(() => {
    // Create Graphemes
    return Promise.map(
      GraphemeData,
      function(grapheme) {
        Grapheme.create(grapheme).then(newGrapheme => {
          return Promise.map(grapheme.phoneme, phoneme => {
            Phoneme.findAll({
              where: {
                id: phoneme
              }
            }).then(ph => {
              newGrapheme.setPhonemes(ph[0].dataValues.uuid);
            });
          });
        });
      },
      { concurrency: 5 }
    );
  })
  // .then(() => {
  //   // create Words
  //   return Promise.map(wordData, function(word) {
  //     Word.create(word).then((newWord) => {
  //       return Promise.map(word.graphemes, (grapheme) => {
  //         Grapheme.findAll({
  //           where: {
  //             grapheme: grapheme.grapheme,
  //           },
  //         }).then((gr) => {
  //           newWord.setGraphemes([gr[0].dataValues.uuid]);
  //         });
  //       });
  //     });
  //   });
  // })
  .then(() => {
    return Promise.map(SchemeData, function(scheme) {
      return PhonicScheme.create(scheme);
    });
  })
  .then(() => {
    // create a cardSet
    return Promise.map(
      cardSetData,
      function(set) {
        CardSet.create(set).then(newSet => {
          return PhonicScheme.findAll({
            where: {
              name: set.phonicScheme
            }
          }).then(scheme => {
            newSet.setPhonic_scheme(scheme[0].dataValues.uuid);
          });
        });
      },
      { concurrency: 5 }
    );
  })
  .then(() => {
    return Promise.map(
      flashcardData,
      function(card) {
        Flashcard.create(card).then(newCard => {
          return Grapheme.findAll({
            where: {
              grapheme: card.grapheme
            }
          })
            .then(grapheme => {
              newCard.setGrapheme(grapheme[0].dataValues.uuid);
            })
            .then(() => {
              return CardSet.findAll({
                where: {
                  name: card.cardSet
                }
              }).then(set => {
                newCard.setCard_set(set[0].dataValues.uuid);
              });
            });
        });
      },
      { concurrency: 5 }
    );
  })
  .catch(err => {
    console.error('Error!', err, err.stack);
  });
