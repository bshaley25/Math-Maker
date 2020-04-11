import React from 'react'

export default ({ id, children }) => {


    const dragOver = (event) => {
        event.preventDefault()
    }

    const dragStart = event => {
        const target = event.target
        target.style.color = 'red'
        target.style.width = 0
        target.style.height = 0
        target.style.margin = 'auto'

        event.dataTransfer.setData('card_value', target.innerText)
    }

    const dragEnd = event => {

        const target = event.target
        target.style.color = 'black'
        target.style.width = '4rem'
        target.style.height = '4rem'
        target.style.margin = 0
    }

    const touch = (event) => {
        console.log(event.target)
    }

    return (
        <div
            id={id}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
            // onTouch={touch}
            // onTouchMove={dragOver}
            // onTouchEnd={dragEnd}
        >
            {children}
        </div>
    )

}