//format.js
//assembles work area buffers from passed-in params
//based on list of allowed fields for a given geosupport function

var boroughCodes = {
  "MANHATTAN": "1",
  "NEW YORK": "1",
  "BRONX": "2",
  "BROOKLYN": "3",
  "KINGS": "3",
  "QUEENS": "4",
  "STATEN ISLAND": "5",
  "RICHMOND": "5"
};

module.exports = function(params, allowedFields, spec1, spec2) {

console.log(params, allowedFields, spec1, spec2)

  var wa1 = new Buffer(spec1.length),
      wa2 = new Buffer(spec2.length);

  wa1.fill(" ");
  wa2.fill(" ");

  allowedFields.forEach(function(field){

    if (!params[field]) return;

    var val = params[field].toUpperCase(),
        fieldSpec = spec1.fields[field];

    if (field === "borough") {
      val = boroughCodes[val] || "";
    }

    if (val) {
      wa1.write(val.substring(0, fieldSpec.end - fieldSpec.start + 1), fieldSpec.start - 1);
    }

  });

  return [wa1, wa2];

};
