import React from 'react'
import Cell from './Cell'

export default () => {

    const makecells = []
    for(let i=0;i<600;i++) {
        const x = i % 10
        const y = Math.floor(i / 10)
        const position = `${x},${y}`

        makecells.push(<Cell id={position}></Cell>)
    }
    
    return (
        <>
            <div id='capture' className='grid' >
                {makecells}
            </div>
        </>
    )
    
}