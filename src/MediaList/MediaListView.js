import React from 'react'
import PropTypes from 'prop-types';

export default function MediaListView({ articles }) {
  const [ selectedArticleUrls, setSelectedArticleUrls ] = React.useState([]);
  const handleChange = e => {
    const url = e.target.id;
    if (!e.target.checked) {
      setSelectedArticleUrls(selectedArticleUrls.filter(article => article !== url));
    } else {
      setSelectedArticleUrls([...selectedArticleUrls, url]);
    }
  };
  const listItems = articles.map(article =>
    <li key={article.url}>
      <input id={article.url} type='checkbox' onChange={handleChange} />
      <a href={article.url} target='_blank' rel="noopener noreferrer">{article.title}</a>
    </li>
  );
  const handleSubmit = e => {
    e.preventDefault();
    // find relevant articles
    const selectedArticles = selectedArticleUrls.map(selectedArticleUrl => {
      for (let i=0; i<articles.length; i++) {
        if (articles[i].url === selectedArticleUrl) return articles[i];
      }
    });
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
  return (
    <div>
      <h1>Articles</h1>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Copy articles to clipboard</button>
        <ul>{listItems}</ul>
      </form>
    </div>
  );
}

MediaListView.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object)
};

MediaListView.defaultProps = {
  articles: []
};