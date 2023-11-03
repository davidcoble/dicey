import React from 'react';
import MapInset from './MapInset';
import { connect } from 'react-redux';
import { startSetPlayerGameMapPosition } from '../../actions/games';
import DraggableThree from './DraggableThree';
import GameNav from '../GameNav';



export class MapPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("MapPage props = " + JSON.stringify(props, null, 2));
        this.state = {
            ...props,
            startClientX: 0,
            startClientY: 0,
            scrollX: 0,
            scrollY: 0,
            newScrollX: 0,
            newScrollY: 0,
            mapDrag: false,
        }

    }

    mapScrollEvent = (xS, yS) => {
        //console.log("scrollEvent called. xS = " + xS + " yS = " + yS);
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
        this.state.scrollX = x;
        this.state.scrollY = y;
        mapElement.scrollTo(x, y);

    }
    mapClick = (e) => {
        e.preventDefault();
        const xPos = (e.clientX + this.state.scrollX);
        const yPos = (e.clientY + this.state.scrollY);
        startSetPlayerGameMapPosition({ x: xPos, y: yPos });
    }

    mapMouseDown = (e) => {
        e.preventDefault();
        const mapElement = document.getElementById("myMapElement");
        this.state.startClientX = e.clientX;
        this.state.startClientY = e.clientY;
        if (e.nativeEvent.button === 1) {
            this.state.mapDrag = true;
        }
    }
    mapMouseUp = (e) => {
        e.preventDefault();
        if (e.nativeEvent.button === 1) {
            this.state.scrollX = this.state.newScrollX >= 0 ? this.state.newScrollX : 0;
            this.state.scrollY = this.state.newScrollY >= 0 ? this.state.newScrollY : 0;
            console.log("mouseUp with (x,y) = (" + this.state.scrollX + "," + this.state.scrollY + ")");
            this.state.mapDrag = false;
        }
    }
    mapMouseMove = (e) => {
        e.preventDefault();
        if (this.state.mapDrag) {
            this.state.newScrollX = this.state.scrollX + this.state.startClientX - e.clientX;
            this.state.newScrollY = this.state.scrollY + this.state.startClientY - e.clientY;
            if (this.state.newScrollX < 0) {
                this.state.newScrollX = 0;
            }
            if (this.state.newScrollY < 0) {
                this.state.newScrollY = 0;
            }
            const mapElement = document.getElementById("myMapElement");
            mapElement.scrollTo(this.state.newScrollX, this.state.newScrollY);
        }
    }

    onUnitMove = (x, y) => {
        //console.log("onUnitMove called with x = " + x + " y = " + y);
        if (x < 0) {
            --this.state.scrollX;
        }
        if (y < 0) {
            --this.state.scrollY;
        }
        const mapElement = document.getElementById("myMapElement");
        mapElement.scrollTo(this.state.scrollX, this.state.scrollY);

    }

    componentDidUpdate() {
        const mapElement = document.getElementById("myMapElement");
        mapElement.scrollTo(this.state.scrollX, this.state.scrollY);
    }

    render() {
        console.log("MapPage render()");
        return (
            <div>
                <GameNav />
                <div className='rowList'>
                    <div
                        className='mapScrollable'
                        onScroll={this.onScroll}
                        id='myMapElement' >
                        <DraggableThree
                            x={this.state.scrollX}
                            y={this.state.scrollY}
                            parentxoff={this.state.scrollX}
                            parentyoff={this.state.scrollY}
                            onMouseOut={this.onMouseOut}
                            onUnitMove={this.onUnitMove} />
                        <div className='mapImageDiv'
                            id='myMapImageDiv' >

                            <img src="/images/ETO.png"
                                id='myMapImage'
                                className="mapImage"
                                onClick={this.mapClick}
                                onMouseDown={this.mapMouseDown}
                                onMouseUp={this.mapMouseUp}
                                onMouseMove={this.mapMouseMove}
                            />
                        </div>
                    </div>
                    <div>
                        <MapInset mapScrollEvent={this.mapScrollEvent} />
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
