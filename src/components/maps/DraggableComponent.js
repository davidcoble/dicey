import React, { useRef, useState, useEffect } from 'react'

const quickAndDirtyStyle = {
  width: "200px",
  height: "200px",
  background: "#FF9900",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const DraggableComponent = () => {
  const [pressed, setPressed] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const ref = useRef()

  const unitStyles = {
    div: {
        'width': '50px',
        'height': '50px',
        'overflow': 'hidden',
        'position': 'absolute',
        'left': 155,
        'top': 155,
        'border': '1px solid black',
        'borderRadius': 5,
        'zIndex': 1001,
    },
    img: {
        'height': 850,
        'width': 1100,
        'objectPosition': '-25px -90px'
    }
}

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position])

  // Update the current position if mouse is down
  const onMouseMove = (event) => {
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY
      })
    }
  }

  return (
    <div
      ref={ ref }
      style={ unitStyles.div }
      onMouseMove={ onMouseMove }
      onMouseDown={ () => setPressed(true) }
      onMouseUp={ () => setPressed(false) }>
      <img style={unitStyles.img} src="/images/countersheets/03Back.png" />
    </div>
  )
}

export default DraggableComponent
