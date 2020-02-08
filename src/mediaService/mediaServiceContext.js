import newsApiStrategy from './mediaServiceNewsApiStrategy';
import mockApiStrategy from './mediaServiceMockApiStrategy';

export default function getStrategy() {
  const params = window.location.search;
  if (params && /mocks=true/.test(params)) return mockApiStrategy;
  return newsApiStrategy;
}