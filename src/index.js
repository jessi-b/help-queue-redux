import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/App';
import './index.css';
// import reducer from './reducers/ticket-list-reducer';
import rootReducer from './reducers/index';

// const store = createStore(reducer);
const store = createStore(rootReducer);
store.subscribe(() =>
  console.log(store.getState())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
