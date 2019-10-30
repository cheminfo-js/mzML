import mzML from '..';
import { readFileSync } from 'fs';
const pathFiles = __dirname + '/../../testFiles/';

describe('mzML', () => {
  it('read tiny.mzML', () => {
    const data = readFileSync(pathFiles + 'tiny.mzML');
    var response = mzML(data);
    expect(response.times).toEqual([5.8905, 5.9905, 42.05]);
    expect(response.series.ms.data.length).toBe(3);
    expect(response.series.ms.data[0][0].length).toBe(15);
    expect(response.series.ms.data[1][0].length).toBe(10);
    expect(response.series.ms.data[2][0].length).toBe(15);
  });

  it.only('read test.mzML', () => {
    const data = readFileSync(pathFiles + 'test.mzML');
    var response = mzML(data);
    expect(response.times.length).toBe(1500);
    expect(response.times.slice(0, 6)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
    expect(response.series.ms.data.length).toBe(1500);
    expect(response.series.ms.data[0][0].length).toBe(1005);
    expect(response.series.ms.data[1][0].length).toBe(1315);
    expect(response.series.ms.data[2][0].length).toBe(1305);
  });
});
