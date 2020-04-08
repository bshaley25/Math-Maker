import React from 'react';
import './stylesheets/App.scss';
import MathMaker from './components/MathMaker'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {

  return (
    <>
      <Header></Header>
      <MathMaker></MathMaker>
      <Footer></Footer>

    </>

  );
}

export default App;
