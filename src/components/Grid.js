import React, { useState } from 'react'
import Cell from './Cell'
import '../stylesheets/Grid.scss'

export default ({gridData, updateCell, columns, rows, size}) => {

    
    const [touchValue, setTouchValue] = useState('');
    
    const handleTouchValue = (value) => {
        setTouchValue(value)
    }

    const makecells = gridData.map(cell => <Cell key={cell.position} {...cell} updateCell={updateCell} touchValue={touchValue} handleTouchValue={handleTouchValue}/>)
    
    return (
        <div 
            id='grid' 
            className='grid'
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, ${size}rem)`,
                gridTemplateRows: `repeat(${rows}, ${size}rem)`,
            }}
        >
            {makecells}
        </div>
    )
}