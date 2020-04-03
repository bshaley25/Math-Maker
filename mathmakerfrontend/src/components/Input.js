import React, {useState} from 'react'

export default () => {

    const [text, settext] = useState('butts')

    const handleChange = () => {
        console.log('butts')
    }

    return (

    <input type='text' onChange={() => handleChange}></input>

    )

}