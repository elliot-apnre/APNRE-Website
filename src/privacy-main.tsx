import React from 'react';
import PrivacyPage from './PrivacyPage';
import { mount } from './mount';
import './index.css';

mount(
  document.getElementById('root')!,
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>
);
