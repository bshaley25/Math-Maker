import React from 'react'
import storage from '../Firebase'

export default ({ saveGrid, saveAsNewGrid, changePage, page }) => {

    

    return (
        <>
            <button onClick={saveGrid}> Save Grid </button>
            <button onClick={saveAsNewGrid}> Save As New Grid </button>
            { page === 'main' ? <button onClick={() => changePage('dashboard')}>Go to Dashboard</button> : <button onClick={() => changePage('main')}>Go to MathMaker</button> }
        </>
    )

}