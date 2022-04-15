import { combineReducers, createStore } from 'redux';
import userReducer from '../features/user';
import allPostReducer from '../features/post';

const reducer = combineReducers({
  user: userReducer,
  allPost: allPostReducer
})

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore( reducer, reduxDevtools);

export default store;

