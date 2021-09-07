import React from 'react';
import './App.css';
import ClientApp from "./ClientApp";
import {Provider} from "react-redux";
import {store} from './store/reducers/RootReducer';

function App() {
    return (
        <div>
            <Provider store={store}>
                <ClientApp/>
            </Provider>
        </div>
    );
}

export default App;
