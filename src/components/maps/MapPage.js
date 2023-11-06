import React from 'react';
import MapInset from './MapInset';
import GameNav from '../GameNav';
import Map from './Map';




export class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMap: 'ETO',
            viewSize:
            {
                x: 1800,
                y: 1000
            },
            scrollStates: {
                ETO: {
                    theater: 'ETO',
                    x: -1000,
                    y: -1000,
                },
                PTO: {
                    theater: 'PTO',
                    x: -1000,
                    y: -1000,
                },
            },
            mapSize: {
                ETO: {
                    x: 4220,
                    y: 3400,
                },
                PTO: {
                    x: 4220,
                    y: 3400,
                }
            }

        };
    }

    mapScrollEvent = (xS, yS, theater) => {
        // attempt to center xS, yS in the map view, where 0.0 < xS,yS < 1.0 
        // also, make theater the active map.

        // console.log(`scrollEvent called. xS = ${xS} yS = ${yS} theater = ${theater}`);
        let x = Math.floor(xS * this.state.mapSize[theater].x);
        // console.log("1. x = " + x);
        x -= Math.floor(this.state.viewSize.x / 2);
        // console.log("2. x = " + x);
        x *= -1;
        // console.log("3. x = " + x);
        let y = Math.floor(yS * this.state.mapSize[theater].y);
        y -= Math.floor(this.state.viewSize.y / 2);
        y *= -1;
        x = x > 0 ? 0 : x;
        // console.log("4. x = " + x);
        y = y > 0 ? 0 : y;
        //x = -1000;
        //y = -1000;

        this.setState(oldState => {
            // console.log("oldState = " + JSON.stringify(oldState, null, 2));
            oldState.currentMap = theater;
            oldState.scrollStates[theater] = {
                x, y, theater
            }
            // console.log("modified oldState = " + JSON.stringify(oldState, null, 2));
            return oldState;
        });
    }
    mapClick = (e) => {
        e.preventDefault();
        const xPos = (e.clientX + this.state.scrollX);
        const yPos = (e.clientY + this.state.scrollY);
    }

    getScrollState = () => {
        return this.state.scrollStates[this.state.currentMap];
    }
    setScrollState = (newState) => {
        this.setState(oldState => {
            // console.log("newState = " + JSON.stringify(newState, null, 2));
            // console.log("oldState = " + JSON.stringify(oldState, null, 2));
            oldState.currentMap = newState.theater;
            oldState.scrollStates[newState.theater] = newState;
            // console.log("modified oldState = " + JSON.stringify(oldState, null, 2));
            return oldState;
        });
    }
    getViewSize = () => {
        return this.state.viewSize;
    }

    render() {
        //console.log("MapPage render() with this.state = " + JSON.stringify(this.state, null, 2));
        return (
            <div>
                <GameNav />
                <div className='rowList'>
                    <div>
                        <Map
                            getScrollState={this.getScrollState}
                            setScrollState={this.setScrollState}
                            getViewSize={this.getViewSize}
                        />
                    </div>
                    <div>
                        <MapInset theater="ETO" mapScrollEvent={this.mapScrollEvent} />
                    </div>
                    <div>
                        <MapInset theater="PTO" mapScrollEvent={this.mapScrollEvent} />
                    </div>

                </div>
            </div>
        );

    }
}

export default MapPage;
