import TrackerMaps from './TrackerMaps';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { GoogleApiWrapper } from 'google-maps-react';

import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class MapsContainer extends Component {
    state = {
        lines: [],
        clients: [],
        selectedLine:{}
    }

    componentDidMount = () => {
        this.fetchGpsData().then((json) => {
                 this.setState({ lines: json.data }, )
             })
    }

    fetchGpsData = async () => {
        // await response of fetch call
        console.log("start gps fetch");
        let response = await fetch('/api/gps');
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
        console.log("data recv: " + data);
        return data;
    }

    getClients = () => {
        let gData = this.state.lines;
        let options = [];
        let temp = {};
        for (let i = 1; i < gData.length; i++)
            temp[gData[i][0]] = true;

        this.state.clients = Object.keys(temp);
        // this.setState({
        //     clients:tmpArr
        // });


        for (let j = 0; j < this.state.clients.length; j++)
        {
            options.push(<option key={j} value={this.state.clients[j]}>{this.state.clients[j]}</option> );
        }
        return options;
    }

    parseLinesOnSelect(evt){
        let c = evt.target.value;
        let tmpLine = [];
        for(let i = 0; i < this.state.lines.length; i++)
        {
            if(this.state.lines[i][0] === c)
            {
                let point = {};
                point.lat = parseFloat(this.state.lines[i][4]);
                point.lng = parseFloat(this.state.lines[i][5]);

                tmpLine.push(point);
            }
        }

        this.setState({
            selectedLine:tmpLine
        });
    }

    render() {
        return (
            <div className="MapsContainer">
                <h1>🌐 The Tracker</h1>
                <div className="wrapper">
                    <form>
                        <ControlLabel>Select a Client</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={this.parseLinesOnSelect.bind(this)}>
                            {this.getClients()}
                        </FormControl>
                    </form>
                    <TrackerMaps google={this.props.google} lines={this.state.selectedLine} />
                </div>
                <br/>
            </div>
        );
    }
}


//export the container WITHIN the GoogleApiWrapper
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAmwqtdD_vcXM4u-ndSEvCDKyep_2kGQc8'
})(MapsContainer);