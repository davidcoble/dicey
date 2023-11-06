import React, { useState } from "react"
import DraggableFour from "./DraggableFour";

export default function Units({ getScrollState, ...props }) {
    let initialPlacement = {
        'ETO': [
            {
                name: 'French Flag',
                id: 1,
                xy: [1264, 1672],
                imageName: "u031901Back.png",
                selectedColor: 'red'
            },
            {
                name: 'French HQ',
                id: 2,
                xy: [1409, 1669],
                imageName: "u031804Front.png",
                selectedColor: 'red'
            }
        ],
        'PTO': [
            {
                name: 'Japanese CV',
                id: 3,
                xy: [2365, 1001],
                imageName: "u010006Front.png",
                selectedColor: '#8F8'
            },
            {
                name: 'Japanese HQ',
                id: 4,
                xy: [2380, 763],
                imageName: "u010113Front.png",
                selectedColor: '#8F8'
            }
        ]
    }


    const [unitList, setUnitList] = useState(initialPlacement);
    const theater = getScrollState().theater;
    return (
        unitList[theater].map((unit) => <DraggableFour
            key={unit.name}
            name={unit.name}
            id={unit.id}
            imageName={unit.imageName}
            x={unit.xy[0]}
            y={unit.xy[1]}
            theater={theater}
            selectedColor={unit.selectedColor}
            getScrollState={getScrollState}
            {...props}
        />)
    );
}