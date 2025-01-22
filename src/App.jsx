import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import axios from 'axios';

const App = () => {

  const apiUrl = 'http://localhost:3001'

  const fetchPosts = () => {
    axios.get(`${apiUrl}/posts`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('Errore durante il caricamente dei post:', error);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container my-5">

      <ArticleList />


    </div>
  );
}

export default App;