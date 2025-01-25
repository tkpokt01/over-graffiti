// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 uses ReactDOM.createRoot
import App from './tApp'; // Import the App component

// Create a root element and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);