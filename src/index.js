import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import {BrowserRouter} from 'react-router-dom';

import {HelmetProvider} from 'react-helmet-async'

import {ThemeProvider} from '@material-ui/core/styles'
import Theme from './utils/theme.util'

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import rootReducers from './redux/reducers/index.reducer'

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/bootstrap-grid.asset.css'
import './assets/styles/globals.scss'

const mainCompose = compose(
  applyMiddleware(thunk),
  persistState('Session')
)

const store = createStore(rootReducers, {}, mainCompose)

ReactDOM.render(
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={Theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>,
  document.getElementById('root')
);

// serviceWorkerRegistration.register(console.log);
serviceWorkerRegistration.register();
reportWebVitals();
