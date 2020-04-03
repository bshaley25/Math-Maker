import React, { useState } from 'react'


export default ( { text } ) => {

    const [content, setcontent] = useState('')
    
    const handleClick = () => {
        setcontent(text)
    }

    return (
        <div onClick={handleClick}>
            {content}
        </div>
    )
    
}