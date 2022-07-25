import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import Dashboard from './Component/Dashboard'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import Profile from './Component/Profile';
import Search from './Component/Search';
import CreatePost from './Component/Createpost';
import Updatepost from './Component/Updatepost';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <Router>
    <Routes>
      <Route path='/' exact element={<App />}></Route>
      <Route path='/dashboard/:id' exact element={<Dashboard  />}></Route>
      <Route path = "/profile/:id" exact element={<Profile />}></Route>
      <Route path = "/search/:id" exact element={<Search  />}></Route>
      <Route path = "/create-post/:id" exact element={<CreatePost />}></Route>
      <Route path = "user/:userId/update-post/:postId" exact element={<Updatepost />}></Route>

    </Routes>
    </Router>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
