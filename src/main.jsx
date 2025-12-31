import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchMovies from "./searchMovies.jsx";
import './App.css';

class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">React Movie Search</h1>
        <SearchMovies/>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);