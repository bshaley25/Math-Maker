import React from 'react'
import Cell from './Cell'

export default ({gridData, updateCell, columns, rows}) => {

    const makecells = gridData.map(cell => <Cell key={cell.position} {...cell} updateCell={updateCell} />)

    return (
        <>
            <div 
                id='grid' 
                className='grid'
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 2rem)`,
                    gridTemplateRows: `repeat(${rows}, 2rem)`,
                }}
            >
                {makecells}
            </div>
        </>
    )
}