import React from "react";
import GameNav from "../GameNav";

import PopulateBoxForcepool from "./PopulateBoxForcepool";
import Units from "../units/Units";

export default function Forcepool(props) {
    const power = props.match.params.power;
    console.log("Forcepool power = " + power);
    const imageFile = `/images/forcepools/${power}.png`
    const theater = `${power}-forcepool`;
    function getScrollState() {
        return {
            x: 0,
            y: 0,
            theater: theater
        }
    }
    const mapName = `${power}-forcepool`;
    return (
        <div>
            <GameNav />
            {/* <PopulateBoxForcepool /> */}
            <Units theater={mapName} forcepool={power} getScrollState={getScrollState} />
            <img src={imageFile} />
            
        </div>
    );
}

