import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import {store} from "./redux/store/store";
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(store.getState());

root.render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);


