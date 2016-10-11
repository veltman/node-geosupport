var spec = require("./spec.js");

module.exports = function(functionCode, params, allowedFields) {

  var wa1 = new Buffer(1200),
      wa2 = new Buffer(spec.wa2.lengths[functionCode]);

  wa1.fill(" ");
  wa2.fill(" ");

  allowedFields.forEach(function(field){
    if (params[field]) {
      // TODO write params[field] to buffer based on spec.wa1.fields[field]
    }
  });

  return [wa1, wa2];

};
