import React from 'react'
import Card from './Card'

export default ({ savedGrids, loadSavedGrid, deleteGrid}) => {

    const cards = savedGrids.map((grid, i)=> <Card key={i} grid={grid} loadSavedGrid={loadSavedGrid} deleteGrid={deleteGrid}/>)

    return (
        <main className='dashboard'>
            {cards}
        </main>
    )

}