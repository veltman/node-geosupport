module.exports = function(wa1, wa2, functionCode, spec) {

  var output = {};

  ["wa1", "wa2"].forEach(function(wa, i){

    var str = i ? wa2 : wa1;

    for (var key in spec[wa].fields) {
      output[key] = str.substring(spec[wa].fields[key].start - 1, spec[wa].fields[key].end).trim();
      if (output[key] && spec[wa].fields.numeric) {
        output[key] = +output[key];
      }
    }

  });

  return output;

};
