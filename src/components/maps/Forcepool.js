import React from "react";
import GameNav from "../GameNav";

import Units from "../units/Units";
import HoldingBox from "./HoldingBox";
import SelectRect from "./SelectRect";

export default class Forcepool extends React.Component {
    constructor(props) {
        super(props);
        const power = props.match.params.power;
        const imageFile = `/images/ae/forcepools/${power}.png`
        const theater = `${power}-forcepool`;
        // console.log("Forcepool props = " + JSON.stringify(props, null, 2));
        this.state = {
            ...props,
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
                width: 1100,
                height: 850,
            },
            power,
            imageFile,
            theater,
        }
        console.log("Forcepool power = " + power);
        this.imgRef = React.createRef();
    }
    componentDidMount() {
        Object.keys(this.imgRef.current).map((key) => {
            console.log("imgRef.current["+key+"] stuff = " + Object.keys(this.imgRef.current[key]));

        })
    }

    getScrollState = () => {
        return {
            x: 0,
            y: 0,
            theater: this.state.theater,
        }
    }
    handleMouseDown = (e) => {
        if (e.nativeEvent.button === 0) {
            //manage selectBox
            this.setState({
                selectBox: {
                    x1: e.clientX - this.state.boundingRect.offsetLeft,
                    y1: e.clientY - this.state.boundingRect.offsetTop,
                    x2: e.clientX - this.state.boundingRect.offsetLeft,
                    y2: e.clientY - this.state.boundingRect.offsetTop,
                }
            })
        }
    }
    handleMouseUp = (e) => {
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
    handleMouseMove = (e) => {
        if (this.state.selectBox.x1 !== 0) {
            console.log("forcepool this.state.selectBox = " + JSON.stringify(this.state.selectBox));
            this.setState({
                selectBox: {
                    x1: this.state.selectBox.x1,
                    y1: this.state.selectBox.y1,
                    x2: e.clientX - this.state.boundingRect.offsetLeft,
                    y2: e.clientY - this.state.boundingRect.offsetTop,
                }
            })
        }
    }
    render() {
        // console.log("Forcepool render state = " + JSON.stringify(this.state, null, 2));
        const power = this.state.power;
        const mapName = `${power}-forcepool`;
        const selectRectLeft = this.state.selectBox.x1 < this.state.selectBox.x2 ? this.state.selectBox.x1 : this.state.selectBox.x2;
        const selectRectTop = this.state.selectBox.y1 < this.state.selectBox.y2 ? this.state.selectBox.y1 : this.state.selectBox.y2;
        const selectRectWidth = Math.abs(this.state.selectBox.x1 - this.state.selectBox.x2);
        const selectRectHeight = Math.abs(this.state.selectBox.y1 - this.state.selectBox.y2);
        this.selectRect = {
            left: selectRectLeft,
            top: selectRectTop,
            width: selectRectWidth,
            height: selectRectHeight,
        }
        // console.log("ForcePool render selectRect = "+JSON.stringify(this.selectRect));
        return (
            <div>
                <GameNav />
                {/* <PopulateBoxForcepool />  */}
                <Units
                    theater={mapName}
                    forcepool={power}
                    getScrollState={this.getScrollState}
                    selectRect={this.selectRect} />
                {this.state.selectBox.x1 !== 0 ? <SelectRect
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                    left={selectRectLeft}
                    top={selectRectTop}
                    width={selectRectWidth}
                    height={selectRectHeight}
                /> : null}
                <div className='rowList' >
                    <div
                        style={{
                            width: 1800,
                            height: '100%',
                        }}
                    >
                        <img
                            ref={this.imgRef}
                            src={this.state.imageFile}
                            onMouseDown={this.handleMouseDown}
                            onMouseUp={this.handleMouseUp}
                            onMouseMove={this.handleMouseMove}
                        />
                    </div>
                    <HoldingBox />
                </div>
            </div >
        );
    }
}


