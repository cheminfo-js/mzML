import {toByteArray} from 'base64-js';

export function decoder(encoded) {
    var buffer = toByteArray(encoded);
    return new Float64Array(buffer.buffer);
    //return new Float32Array(buffer.buffer);
}

export function formatResult(spectra) {
    var result = {
        times: [],
        series: {
            ms: {
                data: [],
                dimensions: 2
            }
        }
    };
    for (var index in spectra) {
        var element = spectra[index];
        if (element.time && element.mass && element.intensity) {
            result.times.push(Number(element.time));
            result.series.ms.data.push([element.mass, element.intensity]);
        }
    }
    return result;
}
