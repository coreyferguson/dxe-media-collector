import { MediaService } from './mediaServiceNewsApiStrategy';
import config from '../config/config-test';
import sinon from 'sinon';
import responseSuccess from './mock/responseSuccess.json';

describe('mediaService', () => {
  describe('fetchAll()', () => {
    it('successful response', async () => {
      const fetch = mockFetch(responseSuccess);
      const mediaService = new MediaService({ config, fetch });
      const res = await mediaService.fetchAll();
      const expectedUrl = 'https://newsapi.org'
        + '?q=%22direct%20action%20everywhere%22'
        + '&apiKey=0123456789&sortBy=publishedAt&language=en&pageSize=100';
      expect(fetch.getCall(0).args[0]).toBe(expectedUrl);
      expect(res).toEqual(responseSuccess);
    });

    it('error', async () => {
      const fetch = mockFetch(null, new Error('oops'));
      const mediaService = new MediaService({ config, fetch });
      await expect(mediaService.fetchAll()).rejects.toThrow('oops');
    });
  });
});

function mockFetch(res, err) {
  if (err) return sinon.stub().throws(new Error(err));
  return sinon.stub().returns(
    Promise.resolve({
      json: () => Promise.resolve(res)
    })
  );
}