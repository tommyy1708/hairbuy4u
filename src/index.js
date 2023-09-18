import React from 'react';
import ReactDOM from 'react-dom/client'
import "./index.css"
import App from './App';
/**
 * here is viewport compatible setting to 'rem'
 * the 1080 over here means based on your blue print of UI
 */

document.documentElement.style.fontSize = 100 / 1080 + 'vw';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);