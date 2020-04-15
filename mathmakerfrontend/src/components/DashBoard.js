import React from 'react'
import Card from './Card'

export default ({ savedGrids }) => {

    const cards = savedGrids.map(grid => <Card grid={grid}/>)

    return (
        <div className='dashboard'>
            {cards}
        </div>
    )

}