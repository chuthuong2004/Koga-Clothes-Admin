import React from 'react';
import './input.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import GlobalStyles from './components/shares/GlobalStyles';
import { store } from './store/store';
const container = document.getElementById('root')!;
const root = createRoot(container);
let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
