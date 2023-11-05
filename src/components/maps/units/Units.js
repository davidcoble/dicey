import React, { useState } from "react"
import DraggableFour from "./DraggableFour";

export default function Units({ ...props }) {
    let initialPlacement = [
        {
            name: 'French Flag',
            xy: [1100, 1200],
            imageName: "u031901Back.png",
        },
        {
            name: 'French HQ',
            xy: [1110, 1210],
            imageName: "u031804Front.png",
        }
    ]


    const [unitList, setUnitList] = useState(initialPlacement);
    return (
        unitList.map((unit) => <DraggableFour
            key={unit.name}
            imageName={unit.imageName}
            x={unit.xy[0]}
            y={unit.xy[1]}
            {...props}
        />)
    );
}