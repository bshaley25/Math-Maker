import React, { Component } from 'react';
import './stylesheets/App.scss';
import Main from './components/Main'
import PictureModal from './components/Modal'
import Login from './components/Login'
import DashBoard from './components/DashBoard';

class App extends Component {
  
  state = {
    page: 'main',
    user: null,
    savedGrids: [],
    gridData: [],
    columns: 15,
    rows: 15,
    size: 2,
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

  resizeGrid = (event) => {
    this.setState({size: event.target.value})
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

  saveAsNewGrid = (event) => {

    event.preventDefault()

    fetch('http://localhost:5000/savegrid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ 
        columns: this.state.columns,
        rows: this.state.rows,
        gridData: this.state.gridData
      }),
    })
    .then(res => res.json())
    .then(savedGrids => this.setState({savedGrids}))
  }

  saveGrid = (event) => {

    event.preventDefault()

    fetch('http://localhost:5000/savegrid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ gridData: this.state.gridData }),
    })
    .then(res => res.json())
    .then()
  }

  getGrid = event => {

    event.preventDefault()

    fetch('http://localhost:5000/grids')
    .then(res => res.json())
    .then(allData => {

      const savedGrids = allData.map(grid => {
        return JSON.parse(grid.data)
      })

      this.setState({ savedGrids })

    })
  }

  changeGrid = event => {
    this.setState({gridData: this.state.savedGrids})
  }

  loginPageChange = () => {
    this.setState({page: 'main'})
  }

  loginUsername = (user) => {
    this.setState({user: user})
  }

  render() {
    return (
      <>
        <header className='header'>
          <h1>Welcome</h1>

          <div className='toolbar'>
            <button onClick={this.createGrid}> Clear </button>
            { localStorage.token ? <button onClick={this.saveGrid}> Save Grid </button> : null}
            { localStorage.token ? <button onClick={this.saveAsNewGrid}> Save As New Grid </button> : null}
            {/* <button onClick={this.getGrid}> GET IT!!! </button> */}
            {/* <button onClick={this.changeGrid}>Change Grid</button> */}
            <PictureModal/>
            { this.state.page === 'dashboard' ? <button onClick={() => this.setState({page: 'main'})}>Go back to main</button> : <button onClick={() => this.setState({page: 'dashboard'})}>DashBoard</button> }
            { this.state.page === 'login' ? <button onClick={() => this.setState({page: 'main'})}>Go back to main</button> : <button onClick={() => this.setState({page: 'login'})}>login</button>  }
          </div>

        </header>


        { this.state.page === 'main' ? <Main
          gridData={this.state.gridData} 
          updateCell={this.updateCell} 
          columns={this.state.columns} 
          rows={this.state.rows} 
          size={this.state.size}
        /> : null}
        { this.state.page === 'login' ? <Login loginPageChange={this.loginPageChange}/> : null }
        { this.state.page === 'dashboard' ? <DashBoard savedGrids={this.state.savedGrids}></DashBoard> : null}

        <footer>
          <input className='input' type="number" min="10" max="40" onChange={this.updateRows} value={this.state.rows}/>
          <input className='input' type="number" min="10" max="40" onChange={this.updateColumns} value={this.state.columns}/>
          <input className='input' type="range" min="1.5" max="3.5" step='.1' onChange={this.resizeGrid} value={this.size}></input>
        </footer>

      </>
    ) 
  }
}

export default App;
