import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MapsContainer from "./MapsContainer"

/*
This is the entry point for the client side react app.

The app is deployed statically by running `npm run build` in the /client folder. 
 */
class App extends Component {
    componentDidMount() {
    }


    render() {
        return (
                <div>
                    <MapsContainer/>
                </div>

        );
    }
}

export default App;
