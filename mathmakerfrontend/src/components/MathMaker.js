// import React,{ Component } from 'react'
// import Grid from './Grid'
// import Calculator from './Calculator';

// export default class MathMaker extends Component {

//     state = {
//         gridData: []
//     }

//     createGrid = () => {
//         const gridData = []
//         for(let i=0;i<600;i++) {
//             const x = i % 30
//             const y = Math.floor(i / 30)
//             const position = `${x},${y}`
//             gridData[i] = {position, value:''}
//         }
//         this.setState({gridData})
//     }

//     componentDidMount() {
//        this.createGrid()
//     }

//     updateCell = (position, value) => {
//         console.log(this.state.gridData)
//         const newGridData = this.state.gridData.map(cell => {
//             if(cell.position === position) {
//                 return {position, value}
//             } else {
//                 return cell
//             }
//         })

//         this.setState({gridData: newGridData})
//     }

//     render() {
//         return (
//             <main>
//                 <Calculator ></Calculator>
//                 {/* <input type="range" min="10" max="50" class="slider"></input> */}
//                 <Grid gridData={this.state.gridData} updateCell={this.updateCell}></Grid>
//             </main>
//         )
//     }
// }
