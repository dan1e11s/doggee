import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './static/css/fonts.css';
import './static/css/global.css';

import App from './App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
