import React from 'react'
import Card from './Card'

export default ({ savedGrids, loadSavedGrid}) => {

    const cards = savedGrids.map((grid, i)=> <Card key={i} grid={grid} loadSavedGrid={loadSavedGrid}/>)

    return (
        <main className='dashboard'>
            {cards}
        </main>
    )

}