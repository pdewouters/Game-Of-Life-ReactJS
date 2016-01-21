import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';

ReactDOM.render(<App pollInterval={2000} />, document.getElementById('root'));
