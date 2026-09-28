import React from 'react';
import App from './App';
import { mount } from './mount';
import './index.css';

mount(
  document.getElementById('root')!,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
