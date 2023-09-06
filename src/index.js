// import './wdyr'; // <--- first import
import React from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { appThemes } from './theme/AppThemes';

const storedTheme = store.getState().themeAppearance;

const defaultTheme = createTheme({
  ...appThemes[storedTheme.customTheme],
});



const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App defaultTheme={defaultTheme} />
    </Provider>
  </BrowserRouter>
);