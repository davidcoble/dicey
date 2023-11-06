import React, { useState } from "react"
import DraggableFour from "./DraggableFour";

export default function Units({ getScrollState, ...props }) {
    let initialPlacement = {
        'ETO': [
            {
                name: 'French Flag',
                xy: [1264, 1672],
                imageName: "u031901Back.png",
            },
            {
                name: 'French HQ',
                xy: [1409, 1669],
                imageName: "u031804Front.png",
            }
        ],
        'PTO': [
            {
                name: 'Japanese CV',
                xy: [2365, 1001],
                imageName: "u010006Front.png",
            },
            {
                name: 'Japanese HQ',
                xy: [2380, 763],
                imageName: "u010113Front.png",
            }
        ]
    }


    const [unitList, setUnitList] = useState(initialPlacement);
    const theater = getScrollState().theater;
    return (
        unitList[theater].map((unit) => <DraggableFour
            key={unit.name}
            imageName={unit.imageName}
            x={unit.xy[0]}
            y={unit.xy[1]}
            getScrollState={getScrollState}
            {...props}
        />)
    );
}