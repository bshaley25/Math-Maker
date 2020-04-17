import React from 'react'

export default ({ saveGrid, saveAsNewGrid, changePage, page, gridID }) => {

    return (
        <>
            { !gridID ? <button onClick={saveAsNewGrid}>CREATE NEW</button> : <button onClick={saveGrid}>SAVE</button>}
            { page === 'main' ? <button onClick={() => changePage('dashboard')}>DASHBOARD</button> : <button onClick={() => changePage('main')}>MAIN</button> }
        </>
    )

}