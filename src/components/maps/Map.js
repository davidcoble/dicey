import React, { useState } from 'react';
import Units from '../units/Units';
import { max } from 'moment';
import SelectRect from './SelectRect';


export class Map extends React.Component {
    constructor(props) {
        super(props);
        // console.log("Map constructor called with props = " + JSON.stringify(props, null, 2));
        this.ref = React.createRef();
        this.state = {
            ...props,
            startClientX: 0,
            startClientY: 0,
            startScrollX: 0,
            startScrollY: 0,
            mapDrag: false,
            selectBox: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
            }
        };
    }

    componentDidMount() {
        const element = this.ref.current;

    }

    mapMouseDown = (e) => {
        // console.log("mapMouseDown this.state = " + JSON.stringify(this.state, null, 2));
        const scrollState = this.state.getScrollState();
        e.preventDefault();
        if (e.nativeEvent.button === 1) {
            this.setState({
                mapDrag: true,
                startClientX: e.clientX,
                startClientY: e.clientY,
                startScrollX: scrollState.x,
                startScrollY: scrollState.y,
            });
        } else if (e.nativeEvent.button === 0) {
            this.setState({
                selectBox: {
                    x1: e.clientX - scrollState.x,
                    y1: e.clientY - scrollState.y,
                    x2: e.clientX - scrollState.x + 1,
                    y2: e.clientY - scrollState.y + 1,
                }
            })
        }
    }

    mapMouseUp = (e) => {
        console.log("mouseup");
        e.preventDefault();
        this.setState({
            mapDrag: false,
            selectBox: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
            }
        });
    }

    mapMouseMove = (e) => {
        // console.log("mapMouseMove this.state = " + JSON.stringify(this.state, null, 2));
        e.preventDefault();
        const scrollState = this.state.getScrollState();

        if (this.state.mapDrag) {
            let x = this.state.startScrollX - this.state.startClientX + e.clientX;
            let y = this.state.startScrollY - this.state.startClientY + e.clientY;
            x = x > 0 ? 0 : x;
            y = y > 0 ? 0 : y;
            let theater = this.state.getScrollState().theater;
            // console.log("this.state.getMapSize(theater).x =" + this.state.getMapSize(theater).x);
            // console.log("this.state.getViewSize().x =" + this.state.getViewSize().x);
            let maxX = -1 * (this.state.getMapSize(theater).x - this.state.getViewSize().x);
            let maxY = -1 * (this.state.getMapSize(theater).y - this.state.getViewSize().y);
            x = x < maxX ? maxX : x;
            y = y < maxY ? maxY : y;
            this.state.setScrollState({
                x,
                y,
                theater
            });
        } else if (this.state.selectBox.x1 !== 0) {
            this.setState({
                selectBox: {
                    x1: this.state.selectBox.x1,
                    y1: this.state.selectBox.y1,
                    x2: e.clientX - scrollState.x + 1,
                    y2: e.clientY - scrollState.y + 1,
                }
            })
        }
    }

    // myStyles = {
    //     mapDiv: {
    //         width: 500,
    //         height: 500,
    //         overflowX: 'hidden',
    //         overflowY: 'hidden',
    //         resize: 'both',

    //     },
    //     mapImage: {
    //         objectPosition: '1000 1000'

    //     },
    // }

    render() {
        const viewSize = this.state.getViewSize();
        // console.log("viewSize = " + JSON.stringify(viewSize));
        // this.myStyles.mapDiv.width = viewSize.x;
        // this.myStyles.mapDiv.height = viewSize.y;
        const scrollState = this.state.getScrollState();
        const imageFile = `/images/${scrollState.theater}.png`;
        console.log("Map rendering with state = " + JSON.stringify(this.state, null, 2));
        const selectRectLeft = this.state.selectBox.x1 < this.state.selectBox.x2 ? this.state.selectBox.x1 : this.state.selectBox.x2;
        const selectRectTop = this.state.selectBox.y1 < this.state.selectBox.y2 ? this.state.selectBox.y1 : this.state.selectBox.y2;
        const selectRectWidth = Math.abs(this.state.selectBox.x1 - this.state.selectBox.x2);
        const selectRectHeight = Math.abs(this.state.selectBox.y1 - this.state.selectBox.y2);
        return (
            <div
                style={{
                    'width': viewSize.x,
                    'height': viewSize.y,
                    'overflowX': 'hidden',
                    'overflowY': 'hidden',
                    'resize': 'both',

                }}
                ref={this.ref}
                id='myMapElement' >
                <div style={{
                    'position': 'relative',
                    'top': scrollState.y,
                    'left': scrollState.x,
                }}
                    id='myMapImageDiv' >
                    <Units mapName={scrollState.theater} getScrollState={this.state.getScrollState} />
                    {this.state.selectBox.x1 !== 0 ? <SelectRect
                        left={selectRectLeft}
                        top={selectRectTop}
                        width={selectRectWidth}
                        height={selectRectHeight} /> : null}
                    <img src={imageFile}
                        id='myMapImage'
                        // style={this.myStyles.mapImage}
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