import { parser } from 'sax';

import { decoder, formatResult } from './utils';

const MASS = 1;
const INTENSITY = 2;

/**
 * Reads a mzML v1.1 file
 * @param {ArrayBuffer} data - ArrayBuffer or any Typed Array (including Node.js' Buffer from v4) with the data
 * @return {{times: Array<number>, series: { ms: { data:Array<Array<number>>}}}}
 */
export default function mzML(data) {
  const xml = parser(true, { trim: true });

  let error = [];
  let spectra = {};
  let currentId;
  let kind;
  let nextData = {};
  let readRaw;

  xml.onopentag = (node) => {
    readRaw = node.name === 'binary';

    // eslint-disable-next-line default-case
    switch (node.name) {
      case 'mzML':
        kind = 'mzML';
        break;
      case 'spectrum':
        if (node.attributes.id) {
          currentId = node.attributes.id;
          spectra[currentId] = {};
        }
        break;
      case 'chromatogram':
        currentId = undefined;
        break;
      case 'binaryDataArray':
        nextData = {};
        break;
      case 'cvParam':
        switch (node.attributes.name) {
          case 'm/z array':
            nextData.kind = MASS;
            break;
          case '64-bit float':
            nextData.type = 'float64';
            break;
          case 'intensity array':
            nextData.kind = INTENSITY;
            break;
          case 'zlib compression':
            nextData.compressionAlgorithm = 'zlib';
            break;
          case 'scan start time':
            spectra[currentId].time = node.attributes.value;
            break;
          default:
        }
        break;
    }
  };

  xml.ontext = (raw) => {
    if (readRaw && currentId) {
      if (nextData.kind === MASS) {
        spectra[currentId].mass = decoder(raw, nextData);
      } else if (nextData.kind === INTENSITY) {
        spectra[currentId].intensity = decoder(raw, nextData);
      }
    }
  };

  xml.onerror = (err) => error.push(err);
  xml.write(data).close();
  if (!kind || kind !== 'mzML') {
    throw new TypeError('Not a mzML file');
  }
  if (error.length > 0) {
    throw new Error(error);
  }

  return formatResult(spectra);
}
