import React from "react";
import GameNav from "../GameNav";

import PopulateBoxForcepool from "./PopulateBoxForcepool";
import Units from "../units/Units";

export default function Forcepool(props) {
    const power = props.match.params.power;
    console.log("Forcepool power = " + power);
    const imageFile = `/images/forcepools/${power}.png`
    function getScrollState() {
        return {}
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

