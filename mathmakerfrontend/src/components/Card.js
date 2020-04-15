import React from 'react'

export default ({ grid, loadSavedGrid }) => {

    const handleClick = () => {
        const gridData =  JSON.parse(grid.data)
        console.log(gridData)
        // loadSavedGrid(grid.colums, grid.rows, gridData, grid.id)
    }

    return (
        <section className='card' >
            {grid.id}
            <button onClick={handleClick}>Edit</button>
        </section>
    )

}