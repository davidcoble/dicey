import React, { useState } from 'react';
import Units from '../units/Units';
import { max } from 'moment';
import SelectRect from './SelectRect';
import { connect } from 'react-redux';
import { handleKeyDown } from '../../routers/PrivateRoute';
import ResizableDiv from '../utils/ResizableDiv';


export class Map extends React.Component {
    constructor(props) {
        super(props);
        // console.log("Map constructor called with props = " + JSON.stringify(props, null, 2));
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
            },
            boundingRect:
            {
                offsetLeft: 0,
                offsetTop: 0,
                width: 1800,
                height: 1000,
            }
        };
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
            //manage selectBox
            this.setState({
                selectBox: {
                    x1: e.clientX - scrollState.x - this.state.boundingRect.offsetLeft,
                    y1: e.clientY - scrollState.y - this.state.boundingRect.offsetTop,
                    x2: e.clientX - scrollState.x + 1 - this.state.boundingRect.offsetLeft,
                    y2: e.clientY - scrollState.y + 1 - this.state.boundingRect.offsetTop,
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
            console.log("x = " + x);
            let y = this.state.startScrollY - this.state.startClientY + e.clientY;
            x = x > 0 ? 0 : x;
            y = y > 0 ? 0 : y;
            let theater = this.state.getScrollState().theater;
            // console.log("this.state.getMapSize(theater).x =" + this.state.getMapSize(theater).x);
            // console.log("this.state.getViewSize().x =" + this.state.getViewSize().x);
            let maxX = -1 * (this.state.getMapSize(theater).x - this.state.boundingRect.width);
            let maxY = -1 * (this.state.getMapSize(theater).y - this.state.boundingRect.height);
            x = x < maxX ? maxX : x;
            y = y < maxY ? maxY : y;
            this.state.setScrollState({
                x,
                y,
                theater
            });
        } else if (this.state.selectBox.x1 !== 0) {
            console.log("event e.target.top = " + e.target.top);

            this.setState({
                selectBox: {
                    x1: this.state.selectBox.x1,
                    y1: this.state.selectBox.y1,
                    x2: e.clientX - scrollState.x + 1 - this.state.boundingRect.offsetLeft,
                    y2: e.clientY - scrollState.y + 1 - this.state.boundingRect.offsetTop,
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

    handleResize = (newSizeData) => {
        console.log("handleResize received " + JSON.stringify(newSizeData));
        const newBoundingRect = { ...this.state.boundingRect };
        Object.keys(newSizeData).map((key) => newBoundingRect[key] = newSizeData[key]);
        this.setState({
            boundingRect: {
                ...newBoundingRect
            }
        })
    }

    render() {
        const viewSize = this.state.getViewSize();
        // console.log("viewSize = " + JSON.stringify(viewSize));
        // this.myStyles.mapDiv.width = viewSize.x;
        // this.myStyles.mapDiv.height = viewSize.y;
        const scrollState = this.state.getScrollState();
        console.log("Map.render() boundingRect = " + JSON.stringify(this.state.boundingRect));
        const imageFile = `/images/${scrollState.theater}.png`;
        console.log("Map rendering with state = " + JSON.stringify(this.state, null, 2));
        const selectRectLeft = this.state.selectBox.x1 < this.state.selectBox.x2 ? this.state.selectBox.x1 : this.state.selectBox.x2;
        const selectRectTop = this.state.selectBox.y1 < this.state.selectBox.y2 ? this.state.selectBox.y1 : this.state.selectBox.y2;
        const selectRectWidth = Math.abs(this.state.selectBox.x1 - this.state.selectBox.x2);
        const selectRectHeight = Math.abs(this.state.selectBox.y1 - this.state.selectBox.y2);
        const selectRect = {
            left: selectRectLeft,
            top: selectRectTop,
            width: selectRectWidth,
            height: selectRectHeight,
        }
        return (
            <ResizableDiv
                width={viewSize.x}
                height={viewSize.y}
                theater={scrollState.theater}
                onResize={this.handleResize}
                id='myMapElement' >
                <div style={{
                    'position': 'relative',
                    'top': scrollState.y,
                    'left': scrollState.x,
                }}
                    id='myMapImageDiv' >
                    <Units
                        mapName={scrollState.theater}
                        getScrollState={this.state.getScrollState}
                        onAddUnit={this.handleAddUnit}
                        onRemoveUnit={this.handleRemoveUnit}
                        onMoveUnit={this.handleMoveUnit}
                        selectRect={selectRect}
                    />
                    {this.state.selectBox.x1 !== 0 ? <SelectRect
                        onMouseUp={this.mapMouseUp}
                        onMouseMove={this.mapMouseMove}
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
            </ResizableDiv>
        );
    }
}
export default Map;
// const mapStateToProps = (state) => ({
// });
// const mapDispatchToProps = (dispatch) => ({
//     handleKeyDown: (e) => dispatch(handleKeyDown(e))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Map);
