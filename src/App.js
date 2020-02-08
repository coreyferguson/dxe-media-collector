import React from 'react';
import './App.css';
import mediaService from './mediaService';

function App() {
  React.useEffect(() => {
    console.log('here');
    mediaService.fetchAll().then(res => {
      console.log('fetchAll complete');
    }).catch(err => {
      console.error('ERROR', err);
    })
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
