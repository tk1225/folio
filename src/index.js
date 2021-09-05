import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react"
import theme from './theme/thema'
import {UserProvider} from "./provider/UserProvider"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<UserProvider>
    <ChakraProvider theme={theme}>
      <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </Router>
    </ChakraProvider>
</UserProvider>
    ,document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorker.unregister();

