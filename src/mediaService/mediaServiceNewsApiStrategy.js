import config from '../config/config-prod';

export class MediaService {
  constructor(options) {
    options = options || {};
    this._config = options.config || config;
    this._fetch = options.fetch || window.fetch.bind(window);
  }

  async fetchAll() {
    const url = this._config.media.newsapi.url;
    const apiKey = this._config.media.newsapi.apiKey;
    const q = '%22direct%20action%20everywhere%22';
    const urlWithParams = `${url}?q=${q}&apiKey=${apiKey}&sortBy=publishedAt&language=en`;
    return this._fetch(urlWithParams).then(res => res.json());
  }
}

export default new MediaService();