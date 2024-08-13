import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as BR} from "react-router-dom"

import UserProvider from './component/userContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BR>


  <UserProvider>
    <App />
  </UserProvider>


    </BR>
  </React.StrictMode>
);

reportWebVitals();
