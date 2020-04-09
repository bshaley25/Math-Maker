import React from 'react'


export default ({ position, value, updateCell }) => {

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

    return (
        <div
            id={position}
            draggable={true}
            onDrop={drop}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onClick={handleClick}
        >
            {value}
        </div>
    )

}
