import React from "react";

export default function SelectRect({ left, top, width, height }) {
    console.log(`SelectRect left=${left}`)
    return <div
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
        <h1> This is a select rect !</h1>
    </div>
}