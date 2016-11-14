**Note: this is a skeleton for a future library, it doesn't work yet! In the meantime, consult [this Gist](https://gist.github.com/veltman/2c79458b2226466920dbd601bf94551f)**

# Geoclient

Future Node.js wrapper for fast geocoding with NYC's [Geosupport system](https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-gde-home.page).

If you are comfortable with Java, you may be better off installing [the official Java servlet Geoclient](https://github.com/CityOfNewYork/geoclient).

## Installation

To install the module:

```sh
npm install geosupport
```

In order to use the module, first you'll have to download and unzip a copy of [Geosupport Desktop Edition](https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-gde-home.page) for your operating system.

#### Linux setup

[Geosupport Desktop Edition for Linux](https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gdelx16b.zip)

Once you've downloaded and extracted GDE, you need to set two environment variables:

Set `GEOFILES` to the full path to the `/fls/` subfolder in the Geosupport files.

Set `LD_LIBRARY_PATH` to the full path for the `/lib/` subfolder in the Geosupport files (trailing slash required).

For example, if you unzipped the files in /var/myfiles/:

```sh
$ export GEOFILES=/var/myfiles/version-16c_16.3/fls/
$ export LD_LIBRARY_PATH=/var/myfiles/version-16c_16.3/lib/
```

#### Windows setup

[Geosupport Desktop Edition for Windows (32-bit)](https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gde16b.zip)  
[Geosupport Desktop Edition for Windows (64-bit)](https://www1.nyc.gov/assets/planning/download/zip/data-maps/open-data/gde6416b.zip)

TK

#### Mac setup

TK, if this is possible w/ Linux libs

## Usage

In order to use the module, you must supply the path to `libgeo.so` (Linux) or `libgeo.dll` (Windows) when creating a new geocoder. It can be an absolute path or relative to the working directory.

```js
var Geoclient = require("geoclient");

var geocoder = new Geoclient("version-16c_16.3/lib/libgeo.so");
```

## API

This module attempts to mirror the [Geoclient REST API](https://api.cityofnewyork.us/geoclient/v1/doc). Full details on responses, parameters, and error codes can be found there.

Parameters are generally case-insensitive and type-insensitive (numbers will be converted into strings as needed).

Allowable `borough` values are: `manhattan`, `bronx`, `queens`, `brooklyn`, `staten island`

`zip` values can be 5-digit ZIP codes (`10271`), 9-digit ZIP+4 codes (`102710002`), or 10-character ZIP+4 codes with a separating dash (`10271-0002`).

#### geocoder.address()

With borough name:

```js
var result = geocoder.address({
  houseNumber: "123",
  street: "Broadway",
  borough: "Manhattan"
});
```

With ZIP code:

```js
var result = geocoder.address({
  houseNumber: "123",
  street: "Broadway",
  zip: "10271"
});
```

With both:

```js
var result = geocoder.address({
  houseNumber: "123",
  street: "Broadway",
  borough: "Manhattan",
  zip: "10271"
});
```

[More details](https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.1)

#### geocoder.bbl()

```js
var result = geocoder.bbl({
  borough: "Manhattan",
  block: "47",
  lot: "7501"
});
```
Note: leading zeroes are optional for the `block` and `lot` numbers.

[More details](https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.2)

#### geocoder.bin()

```js
var result = geocoder.bin({
  bin: "1001026"
});
```

[More details](https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.3)

#### geocoder.blockface()

```js
var result = geocoder.blockface({
  onStreet: "Broadway",
  crossStreetOne: "Cedar St",
  crossStreetTwo: "Pine St",
  borough: "Manhattan"
});
```

Accepts additional optional parameters: `boroughCrossStreetOne` (if different from `borough`), `boroughCrossStreetTwo` (if different from `borough`) and `compassDirection` (`N`, `S`, `E`, `W`).

[More details](https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.4)

#### geocoder.intersection()

```js
var result = geocoder.intersection({
  crossStreetOne: "Broadway",
  crossStreetTwo: "Pine St",
  borough: "Manhattan"
});
```

Accepts additional optional parameters: `boroughCrossStreetTwo` (if different from `borough`) and `compassDirection` (`N`, `S`, `E`, `W`).

[More details](https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.5)

#### geocoder.place()

With borough:

```js
var result = geocoder.place({
  name: "Empire State Building",
  borough: "Manhattan"
});
```

With ZIP code:

```js
var result = geocoder.place({
  name: "Empire State Building",
  zip: "10118"
});
```

With both:

```js
var result = geocoder.place({
  name: "Empire State Building",
  zip: "10118",
  borough: "Manhattan"
});
```

[More details](https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.6)

#### Example response

TK

## To Do

* Test Windows
* Add other functions
* Implement single-field search?

## Contributors

* Noah Veltman
* Chris Whong

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

This permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
