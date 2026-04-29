import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

console.log('REACT_APP_CODESPACE_NAME:', CODESPACE_NAME);
console.log('OctoFit Tracker API base URL:', API_BASE_URL);
window.REACT_APP_API_BASE_URL = API_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
