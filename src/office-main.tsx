import React from 'react';
import ReactDOM from 'react-dom/client';
import OfficePage from './OfficePage';
import { OFFICES, type OfficeId } from './data/offices';
import './index.css';

// Shared entry for adelaide/index.html and mount-gambier/index.html —
// each sets data-office on #root to pick which office to render.
const root = document.getElementById('root')!;
const office = OFFICES[root.dataset.office as OfficeId];
if (!office) throw new Error(`Unknown office: ${root.dataset.office}`);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <OfficePage office={office} />
  </React.StrictMode>
);
