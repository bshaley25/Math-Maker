import React, { Component } from 'react';
import './stylesheets/App.scss';
import Main from './components/Main'
import PictureModal from './components/Modal'
import Login from './components/Login'
import DashBoard from './components/DashBoard';
import UserTools from './components/UserTools'

class App extends Component {
  
  state = {
    page: 'main',
    hasToken: null,
    user: null,
    savedGrids: [],
    gridData: [],
    columns: 15,
    rows: 15,
    size: 2,
  }

  componentDidMount() {
    this.createGrid()

    if(localStorage.token) {
      this.setState({hasToken: true})

      fetch('http://localhost:5000/grids', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({user: data.user})
        this.setState({savedGrids: data.grids})
      })
    } else {
      this.setState({hasToken: false})
    }
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

  plusOneColumn = () => {
    const oldColCount = this.state.columns
    const newColCount = oldColCount + 1
    this.updategridColumns(newColCount, oldColCount)
    this.setState({columns: newColCount})
  }

  minusOneColumn = () => {
    const oldColCount = this.state.columns
    const newColCount = oldColCount - 1
    this.updategridColumns(newColCount, oldColCount)
    this.setState({columns: newColCount})
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

  plusOneRow = () => {
    const oldRowCount = this.state.rows
    const newRowCount = oldRowCount + 1
    this.updategridRows(newRowCount, oldRowCount)
    this.setState({rows: newRowCount})
  }

  minusOneRow = () => {
    const oldRowCount = this.state.rows
    const newRowCount = oldRowCount - 1
    this.updategridRows(newRowCount, oldRowCount)
    this.setState({rows: newRowCount})
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

  changePage = (page) => {
    this.setState({page: page})
  }

  loginUsername = (user) => {
    this.setState({user: user})
  }

  changeToken = () => {
    this.setState({hasToken: true})
  }

  render() {
    return (
      <>
        <header className='header'>
          <h1>Welcome {this.state.user}</h1>
          <nav className='toolbar'>
            { this.state.hasToken ? <UserTools changePage={this.changePage} saveGrid={this.saveGrid} saveAsNewGrid={this.saveAsNewGrid} page={this.state.page} /> : null}
            <PictureModal/>
            { this.state.page === 'login' ? <button onClick={() => this.changePage('main')}>Go back to main</button> : <button onClick={() => this.changePage('login')}>login</button>  }
          </nav>
        </header>

        { this.state.page === 'main' ? 
          <Main
            gridData={this.state.gridData} 
            updateCell={this.updateCell} 
            columns={this.state.columns} 
            rows={this.state.rows} 
            size={this.state.size}
          /> 
          : null}
        { this.state.page === 'login' ? <Login changePage={this.changePage} loginUsername={this.loginUsername} changeToken={this.changeToken} /> : null }
        { this.state.page === 'dashboard' ? <DashBoard savedGrids={this.state.savedGrids}></DashBoard> : null}

        <footer>
          <button onClick={this.createGrid}> Clear </button>
          <div>
            {/* <input className='input' type="number" min="10" max="40" onChange={this.updateRows} value={this.state.rows}/> */}
            <p>Rows: {this.state.rows}</p>
            <button onClick={() => this.minusOneRow()}>-1</button>   
            <button onClick={() => this.plusOneRow()}>+1</button>   
          </div>

          <div>
            <p>Columns: {this.state.columns}</p>
            <button onClick={() => this.minusOneColumn()}>-1</button>   
            <button onClick={() => this.plusOneColumn()}>+1</button>        
          </div>

          <div>
            <p>Grid Size</p>
            <input className='input' type="range" min="1.5" max="3.5" step='.1' onChange={this.resizeGrid} value={this.size}></input>
          </div>
        </footer>

      </>
    ) 
  }
}

export default App;
