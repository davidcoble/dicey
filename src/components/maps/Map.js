import React, { useState } from 'react';
import Units from './units/Units';


export class Map extends React.Component {
    constructor(props) {
        super(props);
        console.log("Map constructor called with props = " + JSON.stringify(props, null, 2));
        this.state = {
            ...props,
            startClientX: 0,
            startClientY: 0,
            startScrollX: 0,
            startScrollY: 0,
            mapDrag: false,
        };
    }




    mapMouseDown = (e) => {
        console.log("mapMouseDown this.state = " + JSON.stringify(this.state, null, 2));
        e.preventDefault();
        if (e.nativeEvent.button === 1) {
            this.setState({
                mapDrag: true,
                startClientX: e.clientX,
                startClientY: e.clientY,
                startScrollX: this.state.scrollState.x,
                startScrollY: this.state.scrollState.y,
            });
        }
    }

    mapMouseUp = (e) => {
        e.preventDefault();
        if (e.nativeEvent.button === 1) {
            this.setState({
                mapDrag: false
            });
        }
    }

    mapMouseMove = (e) => {
        console.log("mapMouseMove this.state = " + JSON.stringify(this.state, null, 2));
        e.preventDefault();
        if (this.state.mapDrag) {
            let x = this.state.startScrollX - this.state.startClientX + e.clientX;
            let y = this.state.startScrollY - this.state.startClientY + e.clientY;
            this.setState({
                scrollX: x,
                scrollY: y
            });
        }
    }

    myStyles = {
        mapDiv: {
            width: 1100,
            height: 900,
            overflowX: 'hidden',
            overflowY: 'hidden',
            resize: 'both',

        },
        mapImage: {
            objectPosition: '1000 1000'

        },
    }

    render() {
        const scrollState = this.state.getScrollState();
        const imageFile = `/images/${scrollState.theater}.png`;
        console.log("Map rendering with scrollState = " + JSON.stringify(scrollState, null, 2));
        return (
            <div
                style={this.myStyles.mapDiv}
                // onScroll={onScroll}
                id='myMapElement' >
                <div style={{
                    'position': 'relative',
                    'top': scrollState.x,
                    'left': scrollState.y
                }}
                    id='myMapImageDiv' >
                    <img src={imageFile}
                        id='myMapImage'
                        style={this.myStyles.mapImage}
                        // onClick={this.mapClick}
                        onMouseDown={this.mapMouseDown}
                        onMouseUp={this.mapMouseUp}
                        onMouseMove={this.mapMouseMove}
                    />
                </div>
            </div>
        );
    }
}

export default Map;