import TenorFetch from '../index';
import { matchers } from 'jest-json-schema';
// https://github.com/apollographql/apollo-client/issues/4857
import fetch from 'cross-fetch';

expect.extend(matchers);
global.fetch = fetch;

const TENOR_API_KEY = '5CLK51TT3X3Y';
const tf = new TenorFetch(TENOR_API_KEY);
const gifResultSchema = {
  properties: {
    created: { type: 'number' },
    hasaudio: { type: 'boolean' },
    id: { type: 'string' },
    media: { type: 'array' },
    tags: { type: 'array', items: { type: 'string' } },
    title: { type: 'string' },
    itemurl: { type: 'string' },
    hascaption: { type: 'boolean' },
    url: { type: 'string' },
  },
};

test('Search', (done) => {
  tf.search('smug anime').then((data) => {
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0]).toMatchSchema(gifResultSchema);
    done();
  });
});

test('Trending', (done) => {
  tf.trending().then((data) => {
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0]).toMatchSchema(gifResultSchema);
    done();
  });
});
