import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from './Context/AuthContext';

//<React.StrictMode>

// AuthProvided (func from AuthContext) wrapping app to get globals from AuthContext {children=appComponent}
ReactDOM.render(
    <AuthProvider> <App/> </AuthProvider>,
  document.getElementById('root')
);