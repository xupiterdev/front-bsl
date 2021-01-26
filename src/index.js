import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import {BrowserRouter} from 'react-router-dom';

import {ThemeProvider} from '@material-ui/core/styles'
import Theme from './utils/theme.util'

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import rootReducers from './redux/reducers/index.reducer'

import './assets/bootstrap-grid.asset.css'

const mainCompose = compose(
  applyMiddleware(thunk),
  persistState('Session')
)

const store = createStore(rootReducers, {}, mainCompose)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// serviceWorkerRegistration.register(console.log);
serviceWorkerRegistration.register();
reportWebVitals();
