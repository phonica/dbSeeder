const Promise = require('bluebird');
const PhonemeData = require('./seedData/phonemeData');
const Phoneme = require('./db').phonemes;
Promise.map(PhonemeData, function(phoneme) {
  return Phoneme.create(phoneme);
});
