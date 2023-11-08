import React, { Fragment } from "react"
import Unit from "./Unit";
import { connect } from "react-redux";

export class Units extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,

        }
    }
    render() {

        const theater = this.state.getScrollState().theater;
        return (
            <Fragment>
                {
                    this.props.unitList.map((unit) => <Unit
                        key={unit.name}
                        name={unit.name}
                        id={unit.id}
                        imageName={unit.imageName}
                        x={unit.x}
                        y={unit.y}
                        theater={theater}
                        selectedColor={unit.selectedColor}
                        getScrollState={this.state.getScrollState}

                    />
                    )
                }
            </Fragment>
        )

    }
}
const mapStateToProps = (state, props) => {
    const player = state.players.find((player) => player.uid === state.auth.uid)
    const gid = player.rollingGame;
    const game = state.games.find((game) => game.id === gid);
    const units = game.units[props.theater];
    // console.log("Units props.mapName = " + JSON.stringify(props.mapName, null, 2));
    // console.log("Units units = " + JSON.stringify(units, null, 2));
    let unitList = [];
    let xoff = 10;
    let yoff = 100;
    if ( units instanceof Object ) {    
        Object.keys(units).map((key) => {
            let unit = units[key];
            unit.name = key;
            unit.x = xoff;
            unit.y = yoff;
            unit.theater = props.theater;
            xoff += 80;
            if (xoff > 1080) {
                xoff = 10;
                yoff += 80;
            }
            unitList.unshift(unit)
        });
    }
    return ({
        unitList: unitList
    });
}

// const mapDispatchToProps = (dispatch, props) => ({
// });
export default connect(mapStateToProps, null)(Units);
