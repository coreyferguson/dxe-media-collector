import React from 'react';
import './App.css';
import getMediaService from './mediaService';
import MediaList from './MediaList';

function App() {
  const [articles, setArticles] = React.useState([]);
  React.useEffect(() => {
    getMediaService().fetchAll().then(res => setArticles(res.articles)).catch(err => {
      console.log('err :', err);
    })
  }, []);
  return (
    <div className="App">
      <MediaList articles={articles} />
    </div>
  );
}

export default App;
