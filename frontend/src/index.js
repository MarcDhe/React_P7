import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // IMPORE STORE 
import store from './utils/store'; // IMPORE STORE 
import Error from './components/Error/Error';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import Home from './pages/Home/Home';
import PostDetails from './pages/PostDetails/PostDetails';
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import EditProfile from './components/EditProfile/EditProfile';
import Activity from './components/Activity/Activity';
import MessageProfile from './components/MessageProfile/MessageProfile';
import Message from './pages/Message/Message'
import AllMessage from './components/Message/AllMessage/AllMessage';
import NewMessage from './components/Message/NewMessage/NewMessage';
import Conversation from './components/Message/Conversation/Conversation';
import Search from './pages/Search/Search';
import '../src/utils/style/GlobalStyle.scss'
import reportWebVitals from './reportWebVitals';
import CreatePost from './pages/CreatePost/CreatePost';

const root = ReactDOM.createRoot(  document.getElementById('root')); //COURS 'NON SUPPORTER' https://stackoverflow.com/questions/71668256/deprecation-notice-reactdom-render-is-no-longer-supported-in-react-18

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store= {store}>
    <div className="main-body">
      <div className='navbar'>
        <NavBar/>
      </div>
      <div className='sidebar'>
      <SideBar />
      </div>
      <div className='main-content'>
        <Routes> {/* pour affichage spec https://reactrouter.com/docs/en/v6/getting-started/overview */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route index element={<Home />} />
        <Route path='/profile' element={<Profile/>} >
          <Route  index path='activity' element={<Activity />} />
          <Route path='message' element={<MessageProfile />} />
          <Route path='edit' element={<EditProfile />} />
        </Route>
        <Route path="/messaging" element={<Message />} >
          <Route index element={<AllMessage />} />
          <Route path="newMessage" element={<NewMessage />} />
          <Route path='user/:id' element={ <Conversation />} />
        </Route>
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/post/:id' element={<PostDetails />} /> {/* BONNE NEOTATION ?  */}
        <Route path='/search/:id' element={ < Search />} />
        <Route path='*' element={<Error />} />
      </Routes>
      </div>
    </div>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


