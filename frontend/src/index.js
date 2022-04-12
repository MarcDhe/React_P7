import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/Error/Error';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
// import GlobalStyle from '../utils/style/GlobalStyle'
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <GlobalStyle /> */}
    <NavBar />
    <SideBar />
    <Routes> {/* pour affichage spec https://reactrouter.com/docs/en/v6/getting-started/overview */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './App';
// import Error from './components/Error/Error';
// import NavBar from './components/NavBar/NavBar';
// import SideBar from './components/SideBar/SideBar';
// import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
// import SignUp from './pages/SignUp/SignUp';
// // import GlobalStyle from '../utils/style/GlobalStyle'
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     {/* <GlobalStyle /> */}
//     <NavBar />
//     <SideBar />
//     <Routes> {/* pour affichage spec https://reactrouter.com/docs/en/v6/getting-started/overview */}
//       <Route path='/' element={<SideBar />}>
//         <Route path='home' element={< Home />} />
//       </Route>
//       <Route path='*' element={<Error />} />
//     </Routes>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
