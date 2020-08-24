import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import MediaListStyle from './MediaListStyle';

export function getDefaultState(articles) {
  return {
    articles: !articles ? {} : articles.reduce((agg, article) => {
      agg[article.url] = article;
      return agg;
    }, {}),
    selectedArticles: {}
  };
}

export function reducer(state, action) {
  if (!state) return getDefaultState();
  switch (action.type) {
    case 'SELECT_ARTICLE':
      return {
        ...state,
        selectedArticles: {
          ...state.selectedArticles,
          [action.articleUrl]: true
        }
      };
    case 'DESELECT_ARTICLE':
      return {
        ...state,
        selectedArticles: {
          ...state.selectedArticles,
          [action.articleUrl]: false
        }
      };
    default:
      return state;
  }
};

export default function MediaListView({ articles }) {
  const [state, dispatch] = React.useReducer(reducer, getDefaultState(articles));
  const handleChange = e => {
    const articleUrl = e.target.id;
    if (!e.target.checked) dispatch({ type: 'DESELECT_ARTICLE', articleUrl });
    else dispatch({ type: 'SELECT_ARTICLE', articleUrl });
  };
  const handleSubmit = e => {
    e.preventDefault();
    // fetch a list of selected articles
    const selectedArticles =
      Object.keys(state.selectedArticles)
      .filter(url => state.selectedArticles[url])
      .map(url => state.articles[url]);
    // copy articles to clipboard
    if (!navigator || !navigator.permissions || !navigator.permissions.query) return;
    const promise = navigator.permissions.query({ name: 'clipboard-write' })
    if (!promise) return;
    promise.then(result => {
      if (result.state === 'granted' || result.state === 'prompt') {
        const text = selectedArticles.reduce((agg, a) => {
          const date = new Date(a.publishedAt);
          const dateStr = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
          return agg += `${dateStr}\t${a.source.name}\t\t${a.url}\t${a.title}\n`
        }, '');
        navigator.clipboard.writeText(text).then(() => {
          alert('articles copied to clipboard');
        });
      }
    });
  };
  const listItems = Object.values(state.articles).map(article => {
    const date = moment(article.publishedAt);
    const publishedAtString = date.format('YYYY-MM-DD, dddd');
    return (
      <tr key={article.url}>
        <td><input id={article.url} type='checkbox' onChange={handleChange} /></td>
        <td>{publishedAtString}</td>
        <td><a href={article.url} target='_blank' rel="noopener noreferrer">{article.title}</a></td>
      </tr>
    );
  });
  return (
    <MediaListStyle>
      <h1>Articles</h1>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Copy articles to clipboard</button>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Date</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </form>
    </MediaListStyle>
  );
}

MediaListView.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object)
};

MediaListView.defaultProps = {
  articles: []
};