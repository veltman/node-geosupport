var ffi = require("ffi"),
    formatWorkingAreas = require("./src/format.js"),
    parseWorkingAreas = require("./src/parse.js");

function Geoclient(libPath) {
  this.geocode = ffi.Library("version-16c_16.3/lib/libgeo.so", {
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

    var workingAreas = formatWorkingAreas(functionCode, params, allowedFields);

    this.geocode(workingAreas[0], workingAreas[1]);

    return parseWorkingAreas(workingAreas[0].toString(), workingAreas[1].toString());

  };

}
