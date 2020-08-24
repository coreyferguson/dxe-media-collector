import { reducer, getDefaultState } from './MediaListView';

describe('MediaListView', () => {
  describe('reducer', () => {
    test('getDefaultState with no arguments', () => {
      const defaultState = getDefaultState();
      expect(Object.keys(defaultState.articles)).toHaveLength(0);
    })

    test('getDefaultState with a few articles', () => {
      const defaultState = getDefaultState([
        { url: 'http://article1.com', title: 'article1 title value' },
        { url: 'http://article2.com', title: 'article2 title value' }
      ]);
      expect(defaultState.articles).toEqual({
        'http://article1.com': { url: 'http://article1.com', title: 'article1 title value' },
        'http://article2.com': { url: 'http://article2.com', title: 'article2 title value' }
      });
      expect(Object.keys(defaultState.selectedArticles)).toHaveLength(0);
    });

    test('no state given', () => {
      const stateAfter = reducer(undefined);
      expect(stateAfter).toEqual(getDefaultState([]));
    });

    test('unrecognized action type', () => {
      const defaultState = getDefaultState();
      const stateAfter = reducer(defaultState, { type: 'unrecognized' });
      expect(stateAfter).toEqual(defaultState);
    });

    test('action SELECT_ARTICLE', () => {
      const stateAfter = reducer(
        getDefaultState(createMockArticles()),
        { type: 'SELECT_ARTICLE', articleUrl: 'http://article1.com' }
      );
      expect(Object.keys(stateAfter.selectedArticles)).toHaveLength(1);
      expect(stateAfter.selectedArticles['http://article1.com']).toBe(true);
    });

    test('action DESELECT_ARTICLE', () => {
      const stateAfter = reducer(
        {
          articles: createMockArticles(),
          selectedArticles: {
            'http://article1.com': true,
            'http://article2.com': true
          }
        },
        { type: 'DESELECT_ARTICLE', articleUrl: 'http://article1.com' }
      );
      expect(stateAfter.selectedArticles['http://article1.com']).toBe(false);
      expect(stateAfter.selectedArticles['http://article2.com']).toBe(true);
    });
  });
});

function createMockArticles() {
  return [
    { url: 'http://article1.com', title: 'article1 title value' },
    { url: 'http://article2.com', title: 'article2 title value' }
  ];
}