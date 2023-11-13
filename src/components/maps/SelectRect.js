import React from "react";

export default function SelectRect({ left, top, width, height, onMouseUp, onMouseMove }) {
    console.log(`SelectRect left=${left}`)
    return <div
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
            border: 3,
            borderColor: 'red',
            borderStyle: 'solid',
            position: 'absolute',
            left,
            top,
            width,
            height
        }}
    >
        <img src="/images/transparent.png"
            left={0}
            top={0}
            width={width}
            height={height}
        />
        <h1> This is a select rect !</h1>
    </div>
}