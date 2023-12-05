import React, { Fragment } from "react"
import Unit from "./Unit";
import { connect } from "react-redux";
import { startSetGameTokenData } from "../../actions/games";
import { isPointInRect } from "../utils/RectMath";

export class Units extends React.Component {
    constructor(props) {
        super(props);
        console.log("Units props.selectRect = " + JSON.stringify(props.selectRect));
        this.state = {
            ...props,
        }
    }
    componentDidMount() {
        // this.props.units.map((unit) => {
        //     this.props.startSetGameTokenPosition(this.state.gid, unit);
        // });
        const selectRect = this.props.selectRect;
        // this.props.units.map((unit) => {
        //     const point = { ...unit };
        //     const rect = { ...selectRect }
        //     const selected = isPointInRect({ point, rect });
        //     this.props.startSetGameTokenData(this.props.gid, unit);
        // });
    }
    render() {
        // console.log("Units.render() selectRect = " + JSON.stringify(this.props.selectRect));
        const theater = this.state.getScrollState().theater;
        // console.log("Units theater = " + theater);
        // console.log("Units.render() units = " + JSON.stringify(this.props.units, null, 2));

        return (
            <Fragment>
                {
                    this.props.units.map((unit) => {
                        // const point = { ...unit };
                        // const rect = { ...selectRect }
                        // const selected = isPointInRect({ point, rect });
                        // console.log("unit.selectedColor = " + unit.selectedColor);
                        // if (selected) {
                        //     console.log("unit selected = " + JSON.stringify(unit));
                        // }
                        return <Unit
                            key={unit.id}
                            name={unit.id}
                            id={unit.id}
                            backImageName={unit.backImageName}
                            frontImageName={unit.frontImageName}
                            x={unit.x}
                            y={unit.y}
                            theater={theater}
                            selected={unit.selected}
                            selectedColor={unit.selectedColor}
                            getScrollState={this.state.getScrollState}

                        />
                    }
                    )
                }
            </Fragment>
        )

    }
}
const mapStateToProps = (state, props) => {
    console.log("Units mapStateToProps called for theater: " + props.theater);
    const player = state.players.find((player) => player.uid === state.auth.uid)
    const gid = player.rollingGame;
    const game = state.games.find((game) => game.id === gid);
    const bid = game.box.value;
    // const units = game.units[props.theater];
    // console.log("Units game = " + JSON.stringify(game, null, 2));
    const box = state.boxes.find((box) => box.id === bid);
    // console.log("Units box = " + JSON.stringify(box, null, 2));
    // console.log("Units props = " + JSON.stringify(props, null, 2));
    // const units = box.forcepools[props.forcepool];
    // const units = []; 
    //console.log("About to get unitIds, props.theater = " + props.theater);
    const unitIds = Object.keys(game.units).filter((unit) => {
        return game.units[unit].theater === props.theater
    });
    //console.log("Units units = " + JSON.stringify(unitIds));
    let unitList = [];
    let xoff = 10;
    let yoff = 100;
    // if (units instanceof Object) {
    if (unitIds) {
        unitIds.map((unitId) => {
            const unit = game.units[unitId];
            unitList.unshift(unit);

        });
        // Object.keys(units).map((key) => {
        //     let unit = units[key];
        //     // unit.name = key;
        //     // unit.x = xoff;
        //     // unit.y = yoff;
        //     // unit.theater = props.theater;
        //     // xoff += 80;
        //     // if (xoff > 1080) {
        //     //     xoff = 10;
        //     //     yoff += 80;
        //     // }
        // });
    }
    return ({
        gid,
        units: unitList,
    });
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        startSetGameTokenData: (gid, data) => {
            //console.log("XXXXXXXXXXXXXXXXX data = " + JSON.stringify(data, null, 2));
            dispatch(startSetGameTokenData(gid, data));

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Units);
