import React from 'react'

export default ({ saveGrid, saveAsNewGrid, changePage, page, gridID }) => {

    return (
        <>
            { !gridID ? <button onClick={saveAsNewGrid}> Save As New Grid </button> : <button onClick={saveGrid}> Save Grid </button>}
            { page === 'main' ? <button onClick={() => changePage('dashboard')}>Go to Dashboard</button> : <button onClick={() => changePage('main')}>Go to MathMaker</button> }
        </>
    )

}