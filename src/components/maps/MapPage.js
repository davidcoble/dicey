import React from 'react';
import MapInset from './MapInset';
import { connect } from 'react-redux';
import { startSetPlayerGameMapPosition } from '../../actions/games';
import GameNav from '../GameNav';
import Map from './Map';




export class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMap: 'ETO',
            viewSize:
            {
                x: 1000,
                y: 700
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

        console.log(`scrollEvent called. xS = ${xS} yS = ${yS} theater = ${theater}`);
        let x = Math.floor(xS * this.state.mapSize[theater].x);
        x += this.state.
         * -1;
        let y = Math.floor(yS * this.state.mapSize[theater].y);
         * -1;

        this.setState(oldState => {
            console.log("oldState = " + JSON.stringify(oldState, null, 2));
            oldState.currentMap = theater;
            oldState.scrollStates[theater] = {
                x, y, theater
            }
            console.log("modified oldState = " + JSON.stringify(oldState, null, 2));
            return oldState;
        });
    }
    mapClick = (e) => {
        e.preventDefault();
        const xPos = (e.clientX + this.state.scrollX);
        const yPos = (e.clientY + this.state.scrollY);
    }

    getScrollState = () => {
        return (this.state.scrollStates[this.state.currentMap]);
    }

    render() {
        console.log("MapPage render() with this.state = " + JSON.stringify(this.state, null, 2));
        return (
            <div>
                <GameNav />
                <div className='rowList'>
                    <div>
                        <Map
                            getScrollState={this.getScrollState}
                            setScrollState={this.setScrollState}
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

const mapStateToProps = (state, props) => {
    // console.log("MapPage.mapStateToProps state.games = " + JSON.stringify(state.games, null, 2));
    return {
        game: {}
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    startSetPlayerGameMapPosition: (data) => { dispatch(startSetPlayerGameMapPosition(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
