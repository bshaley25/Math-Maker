import React from 'react'
import Cell from './Cell'

export default () => {

    // const [text, settext] = useState('')

    // const handleChange = (event) => {
    //     settext(event.target.value)
    // }

    const creategrid = () => {
        const cells = []
        for(let i=0; i<=600; i++) {
            cells.push(<Cell key={i}></Cell>)
        }
        return cells
    }
    
    return (
        <>
            {/* <input type='text' onChange={ event => handleChange(event) }></input> */}
            <div className='grid'>
                {creategrid()}
            </div>
        </>
    )
    
}


// const createcolumns = () => {
//     const column = []
//     for(let i=0; i<=35; i++) {
//         let classnames = [`column c${i}`]
//         column.push(<div className={classnames}></div>)
//     }

//     return column
// }

// const createrows = () => {
//     const row = []
//     for(let i=0; i<=35; i++) {
//         let classnames = [`row r${i}`]
//         row.push(<div className={classnames}>{createcolumns()}</div>)
//     }
//     return row
// }