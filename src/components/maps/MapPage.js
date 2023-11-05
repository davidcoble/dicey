import React from 'react';
import MapInset from './MapInset';
import { connect } from 'react-redux';
import { startSetPlayerGameMapPosition } from '../../actions/games';
import GameNav from '../GameNav';
import Units from './units/Units';




export class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollX: -1000,
            scrollY: -1000,
            startClientX: 0,
            startClientY: 0,
            startScrollX: 0,
            startScrollY: 0,
            mapDrag: false,
            theater: 'ETO',
        };
    }

    mapScrollEvent = (xS, yS, theater) => {
        // console.log(`scrollEvent called. xS = ${xS} yS = ${yS} theater = ${theater}`);
        const mapImage = document.getElementById("myMapImage");
        //console.log("mapImage.width = " + mapImage.width);
        const mapElement = document.getElementById("myMapElement");
        const scale = Math.floor(mapImage.width / 200);
        const centerX = Math.floor(mapElement.clientWidth / 2);
        const centerY = Math.floor(mapElement.clientHeight / 2);
        // console.log("centerX = " + centerX);
        // console.log("centerY = " + centerY);
        let x = xS * scale - centerX;
        let y = yS * scale - centerY;
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        x = x > mapImage.width - mapElement.clientWidth ? mapImage.width - mapElement.clientWidth : x;
        y = y > mapImage.height - mapElement.clientHeight ? mapImage.height - mapElement.clientHeight : y;
        x *= -1;
        y *= -1;
        this.setState({
            mapDrag: false,
            scrollX: x,
            scrollY: y,
            theater,
        });
    }
    mapClick = (e) => {
        e.preventDefault();
        const xPos = (e.clientX + this.state.scrollX);
        const yPos = (e.clientY + this.state.scrollY);
    }

    mapMouseDown = (e) => {
        e.preventDefault();
        if (e.nativeEvent.button === 0) {
            this.setState({
                mapDrag: true,
                startClientX: e.clientX,
                startClientY: e.clientY,
                startScrollX: this.state.scrollX,
                startScrollY: this.state.scrollY,
            });
        }
    }
    mapMouseUp = (e) => {
        e.preventDefault();
        if (e.nativeEvent.button === 0) {
            this.setState({ mapDrag: false });
        }
    }
    mapMouseMove = (e) => {
        e.preventDefault();
        if (this.state.mapDrag) {
            let x = this.state.startScrollX - this.state.startClientX + e.clientX;
            let y = this.state.startScrollY - this.state.startClientY + e.clientY;
            this.setState({ scrollX: x, scrollY: y });
        }
    }

    getScrollState = () => {
        return ({ x: this.state.scrollX, y: this.state.scrollY });
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
        // console.log(`MapPage render() with this.state.scrollX = ${this.state.scrollX} this.state.scrollY = ${this.state.scrollY}`);
        let imageFile = `/images/${this.state.theater}.png`;
        return (
            <div>
                <GameNav />
                <div className='rowList'>
                    <div
                        style={this.myStyles.mapDiv}
                        onScroll={this.onScroll}
                        id='myMapElement' >
                        <div style={{
                            'position': 'relative',
                            'top': this.state.scrollY,
                            'left': this.state.scrollX
                        }}
                            id='myMapImageDiv' >
                            <Units
                                mapScrollX={this.state.scrollX}
                                mapScrollY={this.state.scrollY}
                                getScrollState={this.getScrollState}
                            />
                            <img src={imageFile}
                                id='myMapImage'
                                style={this.myStyles.mapImage}
                                onClick={this.mapClick}
                                onMouseDown={this.mapMouseDown}
                                onMouseUp={this.mapMouseUp}
                                onMouseMove={this.mapMouseMove}
                            />
                        </div>
                    </div>
                    <div>
                        <MapInset mapFile="ETO" mapScrollEvent={this.mapScrollEvent} />
                        <MapInset mapFile="PTO" mapScrollEvent={this.mapScrollEvent} />
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
