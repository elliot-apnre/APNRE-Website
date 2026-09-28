import type { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';

/** Starts React on #root. In the built site the page's markup is already
 *  there (scripts/prerender.mjs), so it's hydrated in place. On the dev
 *  server nothing is pre-rendered (#root holds only the <!-- app -->
 *  marker), so it renders from scratch instead. */
export function mount(root: HTMLElement, app: ReactNode) {
  if (root.firstElementChild) ReactDOM.hydrateRoot(root, app);
  else ReactDOM.createRoot(root).render(app);
}
