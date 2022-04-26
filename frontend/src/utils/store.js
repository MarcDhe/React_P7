import { combineReducers, createStore } from 'redux';
import userReducer from '../features/user';
import allPostReducer from '../features/post';
import messageReducer from '../features/message';

const reducer = combineReducers({
  user: userReducer,
  allPost: allPostReducer,
  message: messageReducer
})

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore( reducer, reduxDevtools);

export default store;

