import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { ShowModalProvider } from './context/ShowModalContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ShowModalProvider>
      <ModalProvider>
        <Provider store={store}>
            <App />
        </Provider>
        </ModalProvider>
    </ShowModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
