var spec = require("./spec.js");

module.exports = function(wa1, wa2) {

  var output = {};

  for (var key in spec.fields.wa1) {
    output[key] = wa1.substring(spec.fields.wa1[key].start - 1, spec.fields.wa1[key].end).trim();
    if (output[key] && spec.fields.wa1.numeric) {
      output[key] = +output[key];
    }
  }

  for (var key in spec.fields.wa2) {
    output[key] = wa2.substring(spec.fields.wa2[key].start - 1, spec.fields.wa2[key].end).trim();
    if (output[key] && spec.fields.wa2.numeric) {
      output[key] = +output[key];
    }
  }

  return output;

};
