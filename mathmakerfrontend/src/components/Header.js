import React from 'react'
import html2canvas from 'html2canvas'

export default ({clearGrid}) => {

    const handleClick = (event) => {

        console.log(event.currentTarget)
        html2canvas(document.getElementById('grid'))
            .then(canvas => {
                const link = document.getElementById('link')
                link.href = canvas.toDataURL();
                link.download = "mypainting.png";
            });
    }

    return (
        <header>
            <h1>Welcome User!</h1>
            <nav>
                <button onClick={clearGrid}>Clear</button>
                <h2>Save</h2>
                <h2 onClick={handleClick} ><a id='link'>Take pic</a></h2>
                <h2>Logout</h2>
            </nav>
        </header>
    )

}