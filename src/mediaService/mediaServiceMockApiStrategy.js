import mockResponse from './mock/responseSuccess.json';

export class MediaService {
  async fetchAll() {
    return Promise.resolve(mockResponse);
  }
}

export default new MediaService();