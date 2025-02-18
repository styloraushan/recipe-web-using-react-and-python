import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <toast></toast>
  </React.StrictMode>
);


