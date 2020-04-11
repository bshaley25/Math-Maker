import React from 'react'


export default ({ position, value, updateCell, touchValue, handleTouchValue }) => {

    const dragStart = event => {
        const target = event.target
        
        event.dataTransfer.setData('card_value', target.innerText)
        
        event.target.innerText = ''
    }
    
    const dragOver = (event) => {
        event.preventDefault()
    }
    
    const drop = event => {
        event.preventDefault()

        const card_value = event.dataTransfer.getData('card_value')

        updateCell(position, card_value)
    }

    const handleClick = (event) => {

        let classname = event.target.className
        classname === '' ? event.target.className = 'line' : event.target.className = ''
        switch(classname) {
            case '':
              event.target.className = 'line'
              break;
            case 'line':
                event.target.className = 'strikethrough'
              break;
            default:
                event.target.className = ''
        } 
    }

    const handleTouch = (event) => {
        // console.log('TOUCH END', event.target)

        if(touchValue === '' ) {
            console.log('empty', event.target.innerText)
            handleTouchValue(event.target.innerText)
        } else{
            console.log("NOT", touchValue)
            updateCell(position, touchValue)
            handleTouchValue('')
        }
    }

    return (
        <div
            id={position}
            draggable={true}
            onDrop={drop}
            onDragStart={dragStart}
            onDragOver={dragOver}
            // onTouchStart={touchStart}
            // onTouch={touchStart}
            onTouchEnd={handleTouch}
            // onClick={handleClick}
            onClick={event => event.type === 'touchend' ? null : handleClick}
        >
            {value}
        </div>
    )

}
