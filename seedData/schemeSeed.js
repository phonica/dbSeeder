const Promise = require('bluebird');
const PhonicScheme = require('../db').phonicSchemes;
const SchemeData = require('./schemeData');
Promise.map(SchemeData, function(scheme) {
  return PhonicScheme.create(scheme);
});
