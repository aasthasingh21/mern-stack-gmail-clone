import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// for any frontend application to run we need to have index.html file, 
// so whatever we write in app.js(here react has to be send in the form of html file) is append to
// index.html(in public) more specifically in root(which is an id given in index.html) 
// so that it acts as html for the browser
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

