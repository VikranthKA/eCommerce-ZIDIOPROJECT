import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './react-redux/store/configureStore';
import {BrowserRouter} from 'react-router-dom'

const store = configureStore()
// console.log('state',store.getState())
store.subscribe(()=>{
    console.log('State_Updated',store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Provider store={store}>

    <App />
    </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
