import { readFileSync } from 'fs';

import mzML from '..';

const pathFiles = `${__dirname}/../../testFiles/`;

describe('mzML', () => {
  it('read tiny.mzML', () => {
    const data = readFileSync(`${pathFiles}tiny.mzML`);
    let response = mzML(data);
    expect(response.times).toStrictEqual([5.8905, 5.9905, 42.05]);
    expect(response.series.ms.data).toHaveLength(3);
    expect(response.series.ms.data[0][0]).toHaveLength(15);
    expect(response.series.ms.data[1][0]).toHaveLength(10);
    expect(response.series.ms.data[2][0]).toHaveLength(15);
  });

  it('read test.mzML', () => {
    const data = readFileSync(`${pathFiles}test.mzML`);
    let response = mzML(data);
    expect(response.times).toHaveLength(1500);
    expect(response.times.slice(0, 6)).toStrictEqual([
      0,
      0.2,
      0.4,
      0.6,
      0.8,
      1,
    ]);
    expect(response.series.ms.data).toHaveLength(1500);
    expect(response.series.ms.data[0][0]).toHaveLength(1005);
    expect(response.series.ms.data[1][0]).toHaveLength(1315);
    expect(response.series.ms.data[2][0]).toHaveLength(1305);
  });
});
