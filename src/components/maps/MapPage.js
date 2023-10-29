import React, { useRef } from 'react';
import MapInset from './MapInset';
import { connect } from 'react-redux';
import { startSetPlayerGameMapPosition } from '../../actions/games';


export class MapPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
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
        console.log("CenterX = " + (x+centerX));
        console.log("ScrollX = " + x);

        let y = yS * scale - centerY;
        console.log("CenterY = " + (y+centerY));
        console.log("ScrollY = " + y);
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
        console.log("mapClick x = " + xPos);
        console.log("mapClick y = " + yPos);
        startSetPlayerGameMapPosition({x: xPos, y: yPos});
    }

    render() {
        return (
            <div>
                <div className='rowList'>
                    <div className='mapScrollable' id='myMapElement'>
                        <img src="/images/ETO.png" id='myMapImage' onClick={this.mapClick} />
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
    console.log("MapPage.mapStateToProps state.games = " + JSON.stringify(state.games, null, 2));
    return {
        game: {}
    };
};
const mapDispatchToProps = (dispatch, props) => ({
    startSetPlayerGameMapPosition: (data) => {dispatch(startSetPlayerGameMapPosition(data))}
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
