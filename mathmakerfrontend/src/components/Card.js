import React from 'react'

export default ({ grid, loadSavedGrid, deleteGrid }) => {

    const handleClick = () => {
        const gridData =  JSON.parse(grid.data)
        console.log(gridData)
        loadSavedGrid(grid.colums, grid.rows, gridData, grid.id)
    }
    
    const handleDelete = (event) => {
        event.preventDefault()
        deleteGrid(grid.id)
    }

    return (
        <section className='card' >
            {grid.id}
            <button onClick={handleClick}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </section>
    )

}