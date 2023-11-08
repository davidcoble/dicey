import React from "react";

export default function HoldingBox() {
    return (
        <div style={{
            position: 'relative',
            top: 0,
            left: 0,
        }}>
            <h1 align='center' style={{
                position: 'absolute',
                alignSelf: 'center',
                zIndex: 2000,
            }}
                >Holding Box</h1>
            <img style={{
                position: 'relative',
                top: 0,
                left: 0,
                width: 400,
                zIndex: 1999,
            }} src="/images/white.png" />
        </div>
    )
}