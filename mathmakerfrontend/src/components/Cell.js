import React, { useState } from 'react'

export default ({ id }) => {

    const [className, setClassname] = useState('')

    
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

        card_value === 'Line' ? setClassname('line') : event.target.innerText = card_value
    }

    const handleClick = (event) => {

        // console.log(event.target.className)
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

    return (
        <div
            id={id}
            draggable={true}
            onDrop={drop}
            onDragStart={dragStart}
            onDragOver={dragOver}
            // className={className}
            onClick={handleClick}
        >
        </div>
    )

}
