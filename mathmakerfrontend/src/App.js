import React, { Component } from 'react';
import './stylesheets/App.scss';
import Grid from './components/Grid'
import Calculator from './components/Calculator';
import Header from './components/Header'
import Footer from './components/Footer'


class App extends Component {
  
  state = {
    gridData: []
  }

  createGrid = () => {
      const gridData = []
      for(let i=0;i<600;i++) {
          const x = i % 30
          const y = Math.floor(i / 30)
          const position = `${x},${y}`
          gridData[i] = {position, value:''}
      }
    this.setState({gridData})
  }

  componentDidMount() {
    this.createGrid()
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
        <Header clearGrid={this.createGrid}></Header>
        <main>
          <Calculator ></Calculator>
          <Grid gridData={this.state.gridData} updateCell={this.updateCell}></Grid>
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
