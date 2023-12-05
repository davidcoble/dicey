import React from "react";
import { connect } from "react-redux";
import { startAddTokenToGameBox } from "../../actions/boxes";

export class PopulateBoxForcepool extends React.Component {
    constructor(props) {
        super(props);
        console.log("props = " + JSON.stringify(props));
        this.state = {
            ...props
        }
    };

    createUnitList = (page, jMin, jMax, iMin, iMax, power) => {
        const units = [];
        const fileName1 = page;
        let theater = 'none';
        if (page === 'u01' || page === 'u02') {
            theater = 'pto';
        } else {
            theater = 'eto';
        }
        for (let i = iMin; i <= iMax; i++) {
            const fileName2 = fileName1 + (i < 10 ? ('0' + i) : i);
            for (let j = jMin; j <= jMax; j++) {
                let fileName3 = fileName2 + (j < 10 ? ('0' + j) : j);
                let frontImageFileName = fileName3 + "Front.png";
                let backImageFileName = fileName3 + "Back.png";
                let forcePoolUnit = {
                    id: fileName3,
                    frontImageFileName,
                    backImageFileName,
                    power: power,
                    theater: theater,
                    bid: this.props.bid,
                }
                units.unshift(forcePoolUnit);
                // console.log("new forcepoolunit: " + JSON.stringify(forcePoolUnit));
            }
        }

        units.map((unit) => {
            this.props.startAddTokenToGameBox(unit);
        });
    }

    render() {
        console.log("bid = " + this.props.bid);
        this.createUnitList('u01', 0, 9, 0, 13, 'japanese');
        this.createUnitList('u01', 11, 14, 0, 5, 'japanese');
        this.createUnitList('u01', 10, 10, 6, 7, 'amur');
        this.createUnitList('u01', 10, 10, 8, 10, 'burma');
        this.createUnitList('u01', 10, 14, 11, 12, 'india');
        this.createUnitList('u01', 10, 13, 13, 13, 'indochina');
        this.createUnitList('u01', 14, 14, 13, 13, 'kamchatka');
        this.createUnitList('u01', 11, 12, 8, 10, 'france-pto');
        this.createUnitList('u01', 13, 14, 8, 10, 'hopeh');
        this.createUnitList('u01', 11, 12, 6, 7, 'australia');
        this.createUnitList('u01', 13, 13, 6, 7, 'bangladesh');
        this.createUnitList('u01', 14, 14, 6, 7, 'ceylon');
        this.createUnitList('u01', 15, 17, 0, 0, 'korea');
        this.createUnitList('u01', 15, 19, 1, 1, 'manchuria');
        this.createUnitList('u01', 18, 19, 0, 0, 'malaya');
        this.createUnitList('u01', 15, 16, 2, 2, 'mongolia');
        this.createUnitList('u01', 17, 17, 2, 2, 'nei');
        this.createUnitList('u01', 18, 18, 2, 2, 'new zealand');
        this.createUnitList('u01', 15, 18, 3, 3, 'pakistan');
        this.createUnitList('u01', 15, 16, 4, 4, 'primorye');
        this.createUnitList('u01', 17, 18, 4, 4, 'siam');
        this.createUnitList('u01', 15, 15, 5, 5, 'siberia');
        this.createUnitList('u01', 16, 19, 5, 5, 'sinkiang');
        this.createUnitList('u01', 15, 19, 6, 6, 'szechwan');
        this.createUnitList('u01', 15, 16, 7, 7, 'szechwan');
        this.createUnitList('u01', 17, 17, 7, 7, 'tibet');
        this.createUnitList('u01', 18, 19, 7, 7, 'trans-baikal');
        this.createUnitList('u01', 15, 19, 8, 8, 'yunnan');

        this.createUnitList('u02', 0, 8, 0, 13, 'wally-pto');
        this.createUnitList('u02', 9, 9, 0, 11, 'wally-pto');
        this.createUnitList('u02', 10, 14, 6, 8, 'kiangsu');
        this.createUnitList('u02', 10, 19, 0, 5, 'soviet-pto');
        this.createUnitList('u02', 15, 19, 7, 8, 'kansu');
        this.createUnitList('u02', 19, 19, 6, 6, 'kansu');

        this.createUnitList('u03', 0, 9, 0, 13, 'german');
        this.createUnitList('u03', 10, 14, 0, 9, 'german');
        this.createUnitList('u03', 15, 19, 0, 9, 'france-eto');

        this.createUnitList('u04', 0, 9, 0, 13, 'wally-eto');
        this.createUnitList('u04', 10, 19, 0, 13, 'soviet-eto');

        this.createUnitList('u05', 0, 2, 7, 7, 'algeria');
        this.createUnitList('u05', 3, 4, 7, 7, 'basque');
        this.createUnitList('u05', 0, 3, 8, 8, 'belgium-holland');
        this.createUnitList('u05', 4, 4, 8, 8, 'baltics');
        this.createUnitList('u05', 0, 3, 9, 9, 'bulgaria');
        this.createUnitList('u05', 4, 4, 9, 9, 'denmark');
        this.createUnitList('u05', 5, 7, 0, 0, 'byelorus');
        this.createUnitList('u05', 5, 7, 1, 1, 'catalonia');
        this.createUnitList('u05', 5, 9, 2, 2, 'czechoslovakia');
        this.createUnitList('u05', 8, 9, 0, 1, 'caucasus');
        this.createUnitList('u05', 5, 5, 3, 4, 'crimea');
        this.createUnitList('u05', 6, 9, 3, 4, 'finland');
        this.createUnitList('u05', 5, 9, 5, 9, 'italy');
        this.createUnitList('u05', 10, 14, 0, 0, 'donbass');
        this.createUnitList('u05', 10, 10, 1, 1, 'denmark-norway');
        this.createUnitList('u05', 11, 14, 1, 1, 'greece');
        this.createUnitList('u05', 10, 14, 2, 2, 'hungary');
        this.createUnitList('u05', 10, 11, 3, 3, 'egypt');
        this.createUnitList('u05', 12, 12, 3, 3, 'jordan');
        this.createUnitList('u05', 13, 13, 3, 3, 'iraq');
        this.createUnitList('u05', 14, 14, 3, 3, 'ireland');
        this.createUnitList('u05', 13, 13, 7, 7, 'morocco');
        this.createUnitList('u05', 14, 14, 6, 7, 'morocco');
        this.createUnitList('u05', 13, 13, 6, 6, 'libya');
        this.createUnitList('u05', 10, 14, 4, 5, 'spain');
        this.createUnitList('u05', 10, 12, 6, 6, 'spain');
        this.createUnitList('u05', 10, 12, 7, 9, 'poland');
        this.createUnitList('u05', 13, 14, 8, 9, 'poland');
        this.createUnitList('u05', 15, 16, 6, 8, 'ukraine');
        this.createUnitList('u05', 15, 19, 4, 5, 'turkey');
        this.createUnitList('u05', 17, 19, 6, 6, 'turkey');
        this.createUnitList('u05', 15, 19, 3, 3, 'switzerland');
        this.createUnitList('u05', 15, 19, 2, 2, 'sweden');
        this.createUnitList('u05', 15, 15, 0, 0, 'palestine');
        this.createUnitList('u05', 15, 15, 1, 1, 'portugal');
        this.createUnitList('u05', 16, 16, 0, 1, 'portugal');
        this.createUnitList('u05', 17, 19, 0, 1, 'rumania');
        this.createUnitList('u05', 17, 17, 7, 7, 'persia');
        this.createUnitList('u05', 18, 18, 7, 7, 'syria');
        this.createUnitList('u05', 19, 19, 7, 7, 'tunisia');
        this.createUnitList('u05', 15, 16, 9, 9, 'yugoslavia');
        this.createUnitList('u05', 17, 19, 8, 9, 'yugoslavia');

        return <p>Populated!</p>
    }
}

const mapStateToProps = (state, props) => {
    let player = state.players.find((p) => { return p.uid === state.auth.uid });
    let box = state.games.find((g) => { return g.id === player.rollingGame });
    console.log("state.props = " + JSON.stringify(props, null, 2));
    return {
        xbid: box.id,
        bid: props.bid,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        startAddTokenToGameBox: (data) => dispatch(startAddTokenToGameBox(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopulateBoxForcepool);
