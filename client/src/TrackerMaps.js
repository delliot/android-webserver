//import React and ReactDOM which we need to mount the map
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


/*
This is the map element. It's props are set by the container and the line is redrawn each time the property is changed.
Also a react component.
 */
export default class TrackerMaps extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google || prevProps.lines !== this.props.lines) {
            this.loadMap();
        }
    }

    componentDidMount()
    {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);


            const mapConfig = Object.assign({}, {
                center: {lat: 49.250795, lng: -123.004943},
                zoom: 14,
                gestureHandling: "cooperative",
                mapTypeId: 'terrain'
            });

            this.map = new maps.Map(node, mapConfig);

            if(this.props.lines)
            {
                let l =  new maps.Polyline({
                    path:this.props.lines,
                    geodesic:true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                l.setMap(this.map);
            }
            console.log("loaded map");
        }
    }

    render() {
        const style = {
            width: '100vw',
            height: '75vh'
        }
        return (
            <div ref="map" style={style}>
                loading map...
            </div>
        )
    }
}