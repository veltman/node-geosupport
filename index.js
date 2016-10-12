var ffi = require("ffi"),
    spec = require("./src/spec.json"),
    formatWorkingAreas = require("./src/format.js"),
    parseWorkingAreas = require("./src/parse.js");

function Geoclient(libPath) {
  this.geocode = ffi.Library(libPath, {
    geo: [ "void", [ "char *", "char *" ] ]
  }).geo;
}

Geoclient.prototype.address = geocodeFn("1B", [ "houseNumber", "street", "zip", "borough", "name" ]);

Geoclient.prototype.bbl = geocodeFn("BL", [ "borough", "block", "lot" ]);

Geoclient.prototype.bin = geocodeFn("BN", [ "bin" ]);

Geoclient.prototype.blockface = geocodeFn("3", [ "onStreet", "crossStreetOne", "crossStreetTwo", "borough", "boroughCrossStreetOne", "boroughCrossStreetTwo", "compassDirection" ]);

Geoclient.prototype.intersection = geocodeFn("2", [ "crossStreetOne", "crossStreetTwo", "borough", "boroughCrossStreetTwo", "compassDirection" ]);

Geoclient.prototype.place = Geoclient.prototype.address;

module.exports = Geoclient;

function geocodeFn(functionCode, allowedFields) {

  return function(params) {

    var workingAreas = formatWorkingAreas(params, allowedFields, spec.wa1, spec.wa2[functionCode]);

    // WA1 function code
    workingAreas[0].write(functionCode);

    // WA1 format indicator (COW)
    workingAreas[0].write("C", 212);

    this.geocode(workingAreas[0], workingAreas[1]);

    return parseWorkingAreas(workingAreas[0].toString(), workingAreas[1].toString(), spec.wa1, spec.wa2[functionCode]);

  };

}

function extend() {

  var obj = Object(arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      obj[key] = arguments[i][key];
    }
  }

  return obj;

}
