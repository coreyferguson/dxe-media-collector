import React from 'react';
import './App.css';
import getMediaService from './mediaService';
import MediaList from './MediaList';

function App() {
  const [ loading, setLoading ] = React.useState(true);
  const [ articles, setArticles ] = React.useState([]);
  const [ error, setError ] = React.useState();
  React.useEffect(() => {
    getMediaService().fetchAll().then(res => {
      setArticles(res.articles);
      setLoading(false);
    }).catch(err => {
      console.error('error', err);
      setLoading(false);
      setError(err);
    });
  }, []);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>
  return (
    <div className="App">
      <MediaList articles={articles} />
    </div>
  );
}

export default App;
