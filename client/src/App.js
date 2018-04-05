import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        response: ''
    }


    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/gps');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    listClientIds () {
        let validIds = [];

        
    }
    render() {
        return (
            <div className="container">
                <div id="map" className="map">
                </div>
                <div className="controls">

                </div>
            </div>

        );
    }
}

export default App;
