module.exports = function(wa1, wa2, spec1, spec2) {

  return addFields(wa2, spec2, addFields(wa1, spec1, {}));

};

function addFields(wa, spec, output) {

  for (var key in spec.fields) {
    output[key] = wa.substring(spec.fields[key].start - 1, spec.fields[key].end).trim();
    if (output[key] && spec.fields[key].numeric) {
      output[key] = +output[key];
    }
  }

  return output;

}
