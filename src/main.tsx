import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('root')!;
const application = <React.StrictMode><App /></React.StrictMode>;

// Older fragment bookmarks redirect before mount, so their home-page HTML cannot be hydrated.
if (root.dataset.routePath === window.location.pathname) {
  ReactDOM.hydrateRoot(root, application);
} else {
  ReactDOM.createRoot(root).render(application);
}
