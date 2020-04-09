import React, { Component } from 'react';
import './stylesheets/App.scss';
import Grid from './components/Grid'
import Calculator from './components/Calculator';
import Header from './components/Header'
import Footer from './components/Footer'

class App extends Component {
  
  state = {
    gridData: [],
    columns: 20,
    rows: 20
  }

  componentDidMount() {
    this.createGrid()
  }

  createGrid = () => {
    const col = this.state.columns
    const row = this.state.rows
    const gridData = []
    for(let i=0;i<(col*row);i++) {
      const x = i % col
      const y = Math.floor(i / col)
      const position = `${x},${y}`
      gridData[i] = {position, value:''}
    }
    this.setState({gridData})
  }
  
  updateColumns = (event) => {
    this.updategridColumns(event.target.value, this.state.columns)
    this.setState({columns: parseInt(event.target.value)})
  }
  
  updategridColumns = (newColCount, oldColCount) => {
    const oldGridData = this.state.gridData
    const row = this.state.rows
    const newGridData = [] 

    if( (newColCount - oldColCount) > 0 ) {       // COLUMNS ARE GETTING BIGGER
      let counter = 0
      for(let i=0; i<(oldColCount*row); i++) {
        if((i+1) % oldColCount === 0 ) {
          const newPosition = `${(newColCount-1)},${counter}`
          newGridData.push(oldGridData[i])
          newGridData.push({position: newPosition, value:''})
          console.log(i, newColCount)
          counter++
        } else {
          newGridData.push(oldGridData[i])
        }
      }

    } else if ( newColCount - oldColCount < 0 ) {  // COLUMNS ARE GETTING SMALLER
      for(let i=0; i<(oldColCount*row); i++) {
        if((i+1) % oldColCount === 0 ) {
          // console.log()
        } else {
          newGridData.push(oldGridData[i])
        }
      }
    }
    this.setState({gridData: newGridData})
  }

  updateRows = (event) => {
    this.updategridRows(event.target.value, this.state.rows)
    this.setState({rows: parseInt(event.target.value)})
  }
  
  updategridRows = (newRowCount, oldRowCount) => { 
    const oldGridData = this.state.gridData
    const columns = this.state.columns
    let newGridData = [] 

    if ( newRowCount > oldRowCount) {              /// ROWS ARE GETTING BIGGER
      for(let i=0; i<(newRowCount*columns); i++) {
        const newPosition = `${(i % columns)},${ (newRowCount - 1) }`
        if( oldGridData[i] ) {
          newGridData.push(oldGridData[i])
        } else {
          newGridData.push({position: newPosition, value: ''})
        }
      }
    } else if ( newRowCount < oldRowCount ) {      /// ROWS ARE GETTING SMALLER
      newGridData = oldGridData.slice( 0 , (-1 * columns) );
    }

    this.setState({gridData: newGridData})
  }


  updateCell = (position, value) => {
    const newGridData = this.state.gridData.map(cell => {
      if(cell.position === position) {
        return {position, value}
      } else {
        return cell
      }
    })
    this.setState({gridData: newGridData})
  }

  render() {
    return (
      <>
        <Header clearGrid={this.createGrid} updateColumns={this.updateColumns} columns={this.state.columns} rows={this.state.rows} updateRows={this.updateRows}></Header>
        <main>
          <Calculator ></Calculator>
          <Grid gridData={this.state.gridData} updateCell={this.updateCell} columns={this.state.columns} rows={this.state.rows}></Grid>
        </main>
        <Footer></Footer>
      </>
    ) 
  }


  // render() {
  //   return (
  //     <>
  //       <Header></Header>
  //       <MathMaker></MathMaker>
  //       <Footer></Footer>
  //     </>

  //   );
  // }
}

export default App;
