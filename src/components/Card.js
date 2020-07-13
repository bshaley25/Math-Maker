import React from 'react'
import '../stylesheets/Card.scss'

export default ({ grid, loadSavedGrid, deleteGrid }) => {

    const handleClick = () => {
        const gridData =  JSON.parse(grid.data)
        loadSavedGrid(grid.colums, grid.rows, gridData, grid.id)
    }
    
    const handleDelete = (event) => {
        event.preventDefault()
        deleteGrid(grid.id)
    }

    return (
        <section className='card' >
            <h3>columns: {grid.colums}</h3>
            <h3>rows: {grid.rows}</h3>
            
            <button onClick={handleClick}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </section>
    )
}