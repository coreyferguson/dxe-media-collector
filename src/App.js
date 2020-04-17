import React from 'react';
import './App.css';
import getMediaService from './mediaService';
import MediaList from './MediaList';

function App() {
  const [ loading, setLoading ] = React.useState(false);
  const [ articles, setArticles ] = React.useState();
  const [ error, setError ] = React.useState();
  const [ q, setQ ] = React.useState("");
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>
  const handleSearch = e => {
    e.preventDefault();
    setLoading(true);
    getMediaService().fetchAll(q).then(res => {
      setArticles(res.articles);
      setLoading(false);
    }).catch(err => {
      console.error('error', err);
      setLoading(false);
      setError(err);
    });
  };
  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input id='q' value={q} type='text' name='news-api-query' onChange={e => setQ(e.target.value)}></input>
        <button type='submit'>Search</button>
      </form>
      {articles && <MediaList articles={articles} />}
    </div>
  );
}

export default App;