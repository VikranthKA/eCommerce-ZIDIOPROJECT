import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import reduxStore from './react-redux/store/configureStore';


reduxStore.subscribe(() => {
    console.log('State_Updated', reduxStore.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <App />
        </Provider>
    </BrowserRouter>

);


