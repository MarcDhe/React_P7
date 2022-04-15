import { combineReducers, createStore } from 'redux';
import userReducer from '../features/user';

const reducer = combineReducers({
  user: userReducer
})

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore( reducer, reduxDevtools);

export default store;

