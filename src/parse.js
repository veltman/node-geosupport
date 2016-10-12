module.exports = function(workingAreas, functionCode, spec) {

  var output = {};

  workingAreas.forEach(function(buf, i){

    var waSpec = i ? spec.wa2 : spec.wa1,
        str = buf.toString();

    for (var key in waSpec.fields) {
      output[key] = str.substring(waSpec.fields[key].start - 1, waSpec.fields[key].end).trim();
      if (output[key] && waSpec.fields.numeric) {
        output[key] = +output[key];
      }
    }

  });

  return output;

};
