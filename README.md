# mzML

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Read and explore mzML v1.1 files.

## This project is abandoned !!!

You should use https://github.com/cheminfo-js/mzdata that deals with mzml and mzdata file format

## Installation

`$ npm install --save mzml`

## Usage

```js
import { mzML } from 'mzml';

// mzML files
const mzMLFile = readFileSync(__dirname + '/tiny.mzML');
var response = mzML(mzMLFile);
```

## [API Documentation](https://cheminfo-js.github.io/mzML/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/mzml.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mzml
[travis-image]: https://img.shields.io/travis/cheminfo-js/mzML/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/mzML
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo-js/mzML.svg?style=flat-square
[codecov-url]: https://codecov.io/github/cheminfo-js/mzML
[download-image]: https://img.shields.io/npm/dm/mzml.svg?style=flat-square
[download-url]: https://npmjs.org/package/mzml
