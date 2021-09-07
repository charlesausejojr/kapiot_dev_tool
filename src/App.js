import './App.css';
import React, { useEffect, useState } from 'react';
import DataTable from './components/Table';
import DataAccordion from './components/Accordion';
import Header from './components/Header';
function App() {
  return (
    <div className="app">

    <Header></Header>
    <div className="app__table">
    <DataAccordion></DataAccordion>
     </div>
    </div>
  );
}

export default App;
