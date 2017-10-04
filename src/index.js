import {parser} from 'sax';
import {decoder, formatResult} from './utils';

const MASS = 1;
const INTENSITY = 2;
const NONE = -1;

/**
 * Reads a mzML v1.1 file
 * @param {ArrayBuffer} data - ArrayBuffer or any Typed Array (including Node.js' Buffer from v4) with the data
 * @return {{times: Array<number>, series: { ms: { data:Array<Array<number>>}}}}
 */
export default function mzML(data) {
    const xml = parser(true, {trim: true});

    var error = [];
    var spectra = {};
    var currentId;
    var kind;
    var nextValue;
    var readRaw;

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
            case 'cvParam':
                switch (node.attributes.name) {
                    case 'm/z array':
                        nextValue = MASS;
                        break;
                    case 'intensity array':
                        nextValue = INTENSITY;
                        break;
                    case 'scan start time':
                        spectra[currentId].time = node.attributes.value;
                        break;
                    default:
                        nextValue = NONE;
                        break;
                }
                break;
        }
    };

    xml.ontext = (raw) => {
        if (readRaw && currentId) {
            if (nextValue === MASS) {
                spectra[currentId].mass = decoder(raw);
            } else if (nextValue === INTENSITY) {
                spectra[currentId].intensity = decoder(raw);
            }
            nextValue = NONE;
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
