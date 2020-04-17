import React, { Component } from 'react';
import './stylesheets/App.scss';
import Main from './components/Main'
import PictureModal from './components/Modal'
import Login from './components/Login'
import DashBoard from './components/DashBoard';
import UserTools from './components/UserTools'
import { storage } from './Firebase/index'
import html2canvas from 'html2canvas'

class App extends Component {
  
  state = {
    page: 'main',
    hasToken: null,
    user: null,
    savedGrids: [],
    gridID: null,
    gridData: [],
    columns: 15,
    rows: 15,
    size: 2,
    BASE_URL: 'https://mathmaker.herokuapp.com'
  }

  componentDidMount() {
    this.createGrid()

    if(localStorage.token) {
      this.setState({hasToken: true})
      this.fetchGrids()
    } else {
      this.setState({hasToken: false})
    }
  }

  fetchGrids = () => {
    fetch('https://mathmaker.herokuapp.com/grids', {
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
        if( (i+1) % oldColCount === 0 ) {
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

    fetch('https://mathmaker.herokuapp.com/grids', {
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
    .then(savedGrids => {
      // savedGrids.forEach(savedGrid => {
      this.setState({
        savedGrids: [...this.state.savedGrids, savedGrids[0] ],
        gridID: savedGrids[0].id
      })
    })
  }

  saveGrid = (event) => {

    event.preventDefault()

    fetch(`https://mathmaker.herokuapp.com/grids/${this.state.gridID}`, {
      method: 'PUT',
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
    .then(newGridData => {
      const updatedSavedGrids = this.state.savedGrids.filter(savedGrid => savedGrid.id !== newGridData[0].id).concat(newGridData)
      this.setState({savedGrids: updatedSavedGrids})
    })
  }

  deleteGrid = (gridID) => {

    const updatedSavedGrids = this.state.savedGrids.filter(savedGrid => savedGrid.id !== gridID)
    this.setState({savedGrids: updatedSavedGrids})

    fetch(`https://mathmaker.herokuapp.com/grids/${gridID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.status === 204 ? console.log('Delete Successful') : console.log('Didnt work'))

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

  loadSavedGrid = (columns, rows, gridData, gridID) => {
    this.setState({gridData: gridData})
    this.setState({columns: columns})
    this.setState({rows: rows})
    this.setState({gridID: gridID})
    this.setState({page: 'main'})
  }

  render() {
    return (
      <>
        <header className='header'>
          <h1>Welcome {this.state.user}</h1>
          <nav className='toolbar'>
            { this.state.hasToken ? <UserTools changePage={this.changePage} saveGrid={this.saveGrid} saveAsNewGrid={this.saveAsNewGrid} page={this.state.page} gridID={this.state.gridID}/> : null}
            <PictureModal/>
            { this.state.page === 'login' ? <button onClick={() => this.changePage('main')}>MAIN</button> : <button onClick={() => this.changePage('login')}>LOGIN</button>  }
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
        { this.state.page === 'dashboard' ? <DashBoard savedGrids={this.state.savedGrids} loadSavedGrid={this.loadSavedGrid} deleteGrid={this.deleteGrid}></DashBoard> : null}

        <footer>
          <button onClick={this.createGrid}> Clear </button>
          <div className='tool'>
            <p>Rows: {this.state.rows}</p>
            <button onClick={() => this.minusOneRow()}>-</button>   
            <button onClick={() => this.plusOneRow()}>+</button>   
          </div>

          <div className='tool'>
            <p>Columns: {this.state.columns}</p>
            <button onClick={() => this.minusOneColumn()}>-</button>   
            <button onClick={() => this.plusOneColumn()}>+</button>        
          </div>

          <div className='tool'>
            <p>Grid Size</p>
            <input className='input' type="range" min="2" max="3" step='.1' onChange={this.resizeGrid} value={this.size}></input>
          </div>
        </footer>

      </>
    ) 
  }
}

export default App;
