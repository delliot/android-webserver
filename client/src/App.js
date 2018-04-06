import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MapsContainer from "./MapsContainer"


class App extends Component {
    state = {
        response: '',
        coords:''
    }


    componentDidMount() {
        // this.callApi()
        //     .then(res => this.setState({ response: res.data }))
        //     .catch(err => console.log(err));
    }

    // callApi = async () => {
    //     const response = await fetch('/api/gps');
    //     const body = await response.json();
    //
    //     if (response.status !== 200) throw Error(body.message);
    //
    //     return body;
    // };


    render() {
        return (
                <div>
                    <MapsContainer/>
                </div>

        );
    }
}

export default App;
