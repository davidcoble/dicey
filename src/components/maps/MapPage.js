import React from 'react';
import MapInset from './MapInset';
import { connect } from 'react-redux';
import { startSetPlayerGameMapPosition } from '../../actions/games';
import Draggable from './Draggable';



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
        console.log("CenterX = " + (x + centerX));
        console.log("ScrollX = " + x);

        let y = yS * scale - centerY;
        console.log("CenterY = " + (y + centerY));
        console.log("ScrollY = " + y);
        x = x < 0 ? 0 : x;
        y = y < 0 ? 0 : y;
        this.scrollX = x;
        this.scrollY = y;
        mapElement.scrollTo(x, y);

    }
    startClientX = 0;
    startClientY = 0;
    scrollX = 1697;
    scrollY = 1762;
    newScrollX = 0;
    newScrollY = 0;
    mapClick = (e) => {
        e.preventDefault();
        const xPos = (e.clientX + this.scrollX);
        const yPos = (e.clientY + this.scrollY);
        console.log("mapClick x = " + xPos);
        console.log("mapClick y = " + yPos);
        startSetPlayerGameMapPosition({ x: xPos, y: yPos });
    }

    mapMouseDown = (e) => {
        e.preventDefault();
        console.log("mapMouseDown");
        console.log("button " + e.nativeEvent.button);
        console.log("mapMouseDown screenX = " + e.screenX);
        console.log("mapMouseDown clientX = " + e.clientX);
        console.log("mapMouseDown pageX = " + e.pageX);
        const mapElement = document.getElementById("myMapElement");
        this.startClientX = e.clientX;
        this.startClientY = e.clientY;
        if (e.nativeEvent.button === 1) {
            this.mapDrag = true;
            // let nameArray = Object.getOwnPropertyNames(e);
            // console.log("nameArray = " + JSON.stringify(nameArray, null, 2));

        }
    }
    mapMouseUp = (e) => {
        e.preventDefault();
        console.log("mapMouseUp screenX = " + e.screenX);
        console.log("mapMouseUp clientX = " + e.clientX);
        console.log("mapMouseUp pageX = " + e.pageX);
        console.log("mapMouseUp");
        console.log("button " + e.nativeEvent.button);
        if (e.nativeEvent.button === 1) {
            this.scrollX = this.newScrollX;
            this.scrollY = this.newScrollY;
            console.log("mouseUp with (x,y) = (" + this.scrollX + "," + this.scrollY + ")");
            this.mapDrag = false;
        }
    }
    mapMouseMove = (e) => {
        e.preventDefault();
        if (this.mapDrag) {
            console.log("mapMouseMove");
            const mapElement = document.getElementById("myMapElement");
            console.log("mapMouseMove this.scrollX = " + this.scrollX);
            console.log("mapMouseMove this.startClientX = " + this.startClientX);
            console.log("mapMouseMove e.clientX = " + e.clientX);
            this.newScrollX = this.scrollX + this.startClientX - e.clientX;
            console.log("mapMouseMove newScrollX = " + this.newScrollX);
            this.newScrollY = this.scrollY + this.startClientY - e.clientY;
            mapElement.scrollTo(this.newScrollX, this.newScrollY);
        }
        // let nameArray = Object.getOwnPropertyNames(e);
        // console.log("nameArray = " + JSON.stringify(nameArray, null, 2));
        // nameArray.map((key) => {
        //     console.log("key = " + key);
        //     console.log("e[" + key + "] = " + e[key])
        //     if(e[key] instanceof Object) {
        //         let subArray = Object.getOwnPropertyNames(e[key]);
        //         console.log("--------> subArray = " + JSON.stringify(subArray, null, 2));
        //     }
        // });
        // console.log("e.nativeEvent = " + JSON.stringify(e.nativeEvent.offsetX, null, 2));
        // console.log("offsetX = " + e.x)
    }

    componentDidMount() {
        const mapElement = document.getElementById("myMapElement");
        console.log("componentDidMount with (x,y) = (" + this.scrollX + "," + this.scrollY + ")");
        mapElement.scrollTo(this.scrollX, this.scrollY);
    }

    render() {
        return (
            <div>
                <div className='rowList'>
                    <div
                        className='mapScrollable'
                        id='myMapElement'

                    >
                        <div className='unitDiv1' >
                            <img
                                src="/images/countersheets/03Back.png"
                                className="unit0001"
                            />
                        </div>
                        <div className='unitDiv2' >
                            <img
                                src="/images/countersheets/03Back.png"
                                className="unit0002"
                            />
                        </div>
                        <div className='mapImageDiv'>

                            <img src="/images/ETO.png"
                                id='myMapImage'
                                className="mapImage"
                                onClick={this.mapClick}
                                onMouseDown={this.mapMouseDown}
                                onMouseUp={this.mapMouseUp}
                                onMouseMove={this.mapMouseMove}

                            />
                        </div>
                        {/* <div className='unitDiv3' >
                            <img
                                src="/images/countersheets/03Back.png"
                                className="unit0003"
                            />
                        </div> */}
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
    startSetPlayerGameMapPosition: (data) => { dispatch(startSetPlayerGameMapPosition(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
