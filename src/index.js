import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Signup from './pages/authentication/signup';
import Header from './component/header';
import Footer from './component/footer';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
  <Header />
  <Signup />
  <Footer />
</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
