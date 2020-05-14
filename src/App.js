import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import {Signin} from './components/Signin'
import {Chat} from './components/Chat'
import { CookiesProvider } from 'react-cookie';
const App = () =>(
    <CookiesProvider>
        <Router>
            <Route path="/" component={Signin} exact/>
            <Route path="/chat" component={Chat}/>
        </Router>
    </CookiesProvider>
)

export default App