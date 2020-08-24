import config from '../config/config-prod';

export class MediaService {
  constructor(options) {
    options = options || {};
    this._config = options.config || config;
    this._fetch = options.fetch || window.fetch.bind(window);
  }

  async fetchAll(q) {
    q = encodeURIComponent(q);
    const url = this._config.media.newsapi.url;
    const apiKey = this._config.media.newsapi.apiKey;
    const urlWithParams = `${url}?q=${q}&apiKey=${apiKey}&sortBy=publishedAt&language=en&pageSize=100`;
    return this._fetch(urlWithParams).then(res => res.json());
  }
}

export default new MediaService();