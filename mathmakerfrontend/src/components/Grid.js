import React from 'react'
import Cell from './Cell'

export default ({gridData, updateCell}) => {

    const makecells = gridData.map(cell => <Cell {...cell} updateCell={updateCell} />)

    return (
        <>
            <div id='grid' className='grid'>
                {makecells}
            </div>
        </>
    )
}